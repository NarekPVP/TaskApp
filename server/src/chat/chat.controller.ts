import { Controller, Get, Param, Request } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get()
    async getAllMessages() {
        return await this.chatService.getAllMessages()
    }

    @Get(':secondUserId/:firstUserId')
    async getAllMessagesOfSpecifedUsers(@Param('firstUserId') firstUserId: string, @Param('secondUserId') secondUserId: string) {
        return await this.chatService.getAllMessagesOfSpecifedUsers(firstUserId, secondUserId)
    }

    @Get('clear')
    async clearAllMessages() {
        return await this.chatService.clearAllMessages();
    }
}