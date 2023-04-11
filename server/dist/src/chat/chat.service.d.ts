import { Chat } from "./chat.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
export declare class ChatService {
    private chatRepository;
    constructor(chatRepository: Repository<Chat>);
    addMessage(message: CreateMessageDto): Promise<Chat>;
    getAllMessages(): Promise<Chat[]>;
    getAllMessagesOfSpecifedUsers(firstUserId: string, secondUserId: string): Promise<Chat[]>;
    clearAllMessages(): Promise<void>;
}
