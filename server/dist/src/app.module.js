"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const tasks_module_1 = require("./tasks/tasks.module");
const config_1 = require("@nestjs/config");
const Joi = __importStar(require("@hapi/joi"));
const database_module_1 = require("./database/database.module");
const passport_1 = require("@nestjs/passport");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const app_gateway_1 = require("./app.gateway");
const chat_service_1 = require("./chat/chat.service");
const chat_controller_1 = require("./chat/chat.controller");
const typeorm_1 = require("@nestjs/typeorm");
const chat_entity_1 = require("./chat/chat.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            passport_1.PassportModule,
            nest_keycloak_connect_1.KeycloakConnectModule.registerAsync({
                useFactory: () => ({
                    authServerUrl: 'http://localhost:8080/auth',
                    realm: 'app-realm',
                    clientId: 'client',
                    secret: 'RWRrsPQ6ZTMBnCTobDhpnkdz6cY4F46Z',
                }),
            }),
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required()
                }),
                envFilePath: ['.env.development', '.env'],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat]),
            database_module_1.DatabaseModule,
            tasks_module_1.TasksModule
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, chat_controller_1.ChatController],
        providers: [app_service_1.AppService, user_service_1.UserService, chat_service_1.ChatService, app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map