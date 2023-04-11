import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<any>;
    loginUser(username: string, password: string, session: any): Promise<any>;
    getUserById(id: string): Promise<any>;
}
