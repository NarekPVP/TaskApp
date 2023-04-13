import { Server } from 'socket.io';
import { UserService } from './user/user.service';
import { ChatService } from './chat/chat.service';
export declare class AppGateway {
    readonly userService: UserService;
    readonly chatService: ChatService;
    server: Server;
    constructor(userService: UserService, chatService: ChatService);
    handleNewMessage(payload: any): Promise<void>;
}
