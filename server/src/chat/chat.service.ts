import { Injectable } from "@nestjs/common";
import { Chat } from "./chat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>
    ) {}

    async addMessage(message: CreateMessageDto) {
        const newMessage = await this.chatRepository.create({ ...message })
        await this.chatRepository.save(newMessage)

        return newMessage
    }

    async getAllMessages() {
        return await this.chatRepository.find({
            order: {
                id: "desc"
            }
        })
    }

    async getAllMessagesOfSpecifedUsers(firstUserId: string, secondUserId: string) {
        return await this.chatRepository.find({
            where: [
                { firstUserId: firstUserId, secondUserId: secondUserId },
                { firstUserId: secondUserId, secondUserId: firstUserId },
            ]
        })
    }

    async clearAllMessages(): Promise<void> {
        await this.chatRepository.createQueryBuilder()
          .delete()
          .from(Chat)
          .execute();
      }
}