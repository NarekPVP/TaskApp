import { ChatService } from "./chat.service";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getAllMessages(): Promise<import("./chat.entity").Chat[]>;
    getAllMessagesOfSpecifedUsers(firstUserId: string, secondUserId: string): Promise<import("./chat.entity").Chat[]>;
    clearAllMessages(): Promise<void>;
}
