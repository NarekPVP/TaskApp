import { HttpStatus, Injectable, Req, Session } from '@nestjs/common';
import fetch from 'isomorphic-fetch';
import { ConfigService } from "@nestjs/config"

@Injectable()
export class UserService {
    private readonly keyCloakUrl: string;
    private readonly keyCloakClientId: string;
    private readonly keyCloakClientSecret: string;
    private readonly keyCloakAppRealmClientSecret: string;
    private readonly keyCloakRealmName: string;
    private readonly keyCloakGrantType: string;
    constructor(private readonly configService: ConfigService) {
        this.keyCloakUrl = this.configService.get<string>('KEYCLOAK_URL');
        this.keyCloakClientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID');
        this.keyCloakClientSecret = this.configService.get<string>('KEYCLOAK_CLIENT_SECRET');
        this.keyCloakAppRealmClientSecret = this.configService.get<string>('KEYCLOAK_APP_REALM_CLIENT_SECRET');
        this.keyCloakRealmName = this.configService.get<string>('KEYCLOAK_REALM_NAME');
        this.keyCloakGrantType = this.configService.get<string>('KEYCLOAK_GRANT_TYPE');
    }

    private async getToken(credentials: Record<string, string>, realmName: string = "master"): Promise<string> {
        const response = await fetch(`${this.keyCloakUrl}/realms/${realmName}/protocol/openid-connect/token`, {
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

    async getAllUsers(): Promise<any> {
        const credentials = {
            grant_type: this.keyCloakGrantType,
            client_id: this.keyCloakClientId,
            client_secret: this.keyCloakClientSecret,
        };

        const accessToken = await this.getToken(credentials);

        // get users with access token
        const usersUrl = `${this.keyCloakUrl}/admin/realms/${this.keyCloakRealmName}/users`;

        // Send a GET request to the users endpoint to retrieve all registered users
        const usersResponse = await fetch(usersUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Extract the users from the response
        const users = await usersResponse.json();

        return users;
    }

    async getUserById(id: string) {
        const users = await this.getAllUsers();
        let user = users.find(user => user.id === id)

        return user;
    }

    async loginUser(username: string, password: string): Promise<any> {
        const accessToken = await this.getToken({
            grant_type: this.keyCloakGrantType,
            client_id: this.keyCloakClientId,
            client_secret: this.keyCloakClientSecret,
        });

        // Authenticate user
        const authResponse = await fetch(`${this.keyCloakUrl}/realms/${this.keyCloakRealmName}/protocol/openid-connect/token`, {
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

        // Check if authentication was successful
        if (authResponse.status === 200) {
            // const { access_token: token } = await authResponse.json();
            // console.log('User authenticated successfully with access token:', token);

            const users = await this.getAllUsers();
            const user = users.find(user => user.username === username);
            
            if(user) {
                return { ...user, token: accessToken};
            }

            return false;
        } else {
            const error = await authResponse.json();
            console.log('Authentication failed:', error.error_description);
            throw new Error(); // goto catch
        }
    } catch(error) {
        return {
            status: false,
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Failed to login"
        };
    }
}

// f0439c86-0429-4fda-8da1-e5ce403c8342 == f0439c86-0429-4fda-8da1-e5ce403c8342