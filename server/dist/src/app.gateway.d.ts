import { Server, Socket } from 'socket.io';
import { UserService } from './user/user.service';
import { ChatService } from './chat/chat.service';
import { OnModuleInit } from '@nestjs/common';
import { RoomService } from './room/room.service';
export declare class AppGateway implements OnModuleInit {
    readonly userService: UserService;
    readonly chatService: ChatService;
    readonly roomService: RoomService;
    server: Server;
    constructor(userService: UserService, chatService: ChatService, roomService: RoomService);
    onModuleInit(): void;
    handleNewMessage(payload: any, client: Socket): Promise<void>;
}
