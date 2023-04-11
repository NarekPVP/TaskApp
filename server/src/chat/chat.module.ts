import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Chat } from "./chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatController } from "./chat.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ChatService],
    controllers: [ChatController]
})
export class ChatModule {}