import { ConfigService } from "@nestjs/config";
export declare class UserService {
    private readonly configService;
    private readonly keyCloakUrl;
    private readonly keyCloakClientId;
    private readonly keyCloakClientSecret;
    private readonly keyCloakAppRealmClientSecret;
    private readonly keyCloakRealmName;
    private readonly keyCloakGrantType;
    constructor(configService: ConfigService);
    private getToken;
    getAllUsers(): Promise<any>;
    getUserById(id: string): Promise<any>;
    getCurrentUser(token: string): Promise<any>;
    loginUser(username: string, password: string): Promise<any>;
}
