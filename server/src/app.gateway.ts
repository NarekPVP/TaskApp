import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user/user.service';
import { CreateMessageDto } from './chat/dto/create-message.dto';
import { ChatService } from './chat/chat.service';
import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';

@WebSocketGateway(5297, {
  cors: {
    origin: "*"
  }
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

  constructor(readonly userService: UserService, readonly chatService: ChatService) {}

  @SubscribeMessage('new-message')
  async handleNewMessage(@MessageBody() payload: any) {
    const newMessageDto = new CreateMessageDto(
      payload.currentUserId,
      payload.userToChatId,
      payload.content
    );

    try {
      const currentUser = await this.userService.getUserById(payload.currentUserId)
      const userToChatWith = await this.userService.getUserById(payload.userToChatId)

      const addedMessage = await this.chatService.addMessage(newMessageDto)

      const roomName = payload.currentUserId + "-" + payload.userToChatId

      this.server.to(roomName).emit('send-new-message', {
        message: addedMessage,
        room: roomName,
        creator: `${currentUser.firstName} ${currentUser.lastName} (${currentUser.username})`
      })

    } catch {
      throw new HttpException("Something went wrong please try again later!", HttpStatus.BAD_REQUEST)
    }
  }
}

// this.server.to('user-room').emit('send-new-message', {
//   message: addedMessage,
//   creator: `${payload.firstUser.firstName} ${payload.firstUser.lastName} (${payload.firstUser.username})`
// })
