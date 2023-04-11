"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(configService) {
        this.configService = configService;
        this.keyCloakUrl = this.configService.get('KEYCLOAK_URL');
        this.keyCloakClientId = this.configService.get('KEYCLOAK_CLIENT_ID');
        this.keyCloakClientSecret = this.configService.get('KEYCLOAK_CLIENT_SECRET');
        this.keyCloakAppRealmClientSecret = this.configService.get('KEYCLOAK_APP_REALM_CLIENT_SECRET');
        this.keyCloakRealmName = this.configService.get('KEYCLOAK_REALM_NAME');
        this.keyCloakGrantType = this.configService.get('KEYCLOAK_GRANT_TYPE');
    }
    async getToken(credentials, realmName = "master") {
        const response = await (0, isomorphic_fetch_1.default)(`${this.keyCloakUrl}/realms/${realmName}/protocol/openid-connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(credentials),
        });
        const token = await response.json();
        if (!token.access_token) {
            throw new Error('Token response does not contain an access_token');
        }
        return token.access_token;
    }
    async getAllUsers() {
        const credentials = {
            grant_type: this.keyCloakGrantType,
            client_id: this.keyCloakClientId,
            client_secret: this.keyCloakClientSecret,
        };
        const accessToken = await this.getToken(credentials);
        const usersUrl = `${this.keyCloakUrl}/admin/realms/${this.keyCloakRealmName}/users`;
        const usersResponse = await (0, isomorphic_fetch_1.default)(usersUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const users = await usersResponse.json();
        return users;
    }
    async getUserById(id) {
        const users = await this.getAllUsers();
        let user = users.find(user => user.id === id);
        return user;
    }
    async loginUser(username, password) {
        const accessToken = await this.getToken({
            grant_type: this.keyCloakGrantType,
            client_id: this.keyCloakClientId,
            client_secret: this.keyCloakClientSecret,
        });
        const authResponse = await (0, isomorphic_fetch_1.default)(`${this.keyCloakUrl}/realms/${this.keyCloakRealmName}/protocol/openid-connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username: username,
                password: password,
                client_id: this.keyCloakClientId,
                client_secret: this.keyCloakAppRealmClientSecret
            })
        });
        if (authResponse.status === 200) {
            const users = await this.getAllUsers();
            const user = users.find(user => user.username === username);
            if (user) {
                return Object.assign(Object.assign({}, user), { token: accessToken });
            }
            return false;
        }
        else {
            const error = await authResponse.json();
            console.log('Authentication failed:', error.error_description);
            throw new Error();
        }
    }
    catch(error) {
        return {
            status: false,
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            message: "Failed to login"
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map