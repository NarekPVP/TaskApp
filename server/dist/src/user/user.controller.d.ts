import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<any>;
    getCurrentUser(request: any): Promise<any>;
    loginUser(username: string, password: string): Promise<any>;
    getUserById(id: string): Promise<any>;
}
