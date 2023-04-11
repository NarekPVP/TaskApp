import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user/user.service';
import { CreateMessageDto } from './chat/dto/create-message.dto';
import { ChatService } from './chat/chat.service';

@WebSocketGateway(5297, {
  cors: {
    origin: "*"
  }
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

  constructor(readonly userService: UserService, readonly chatService: ChatService) {}

  @SubscribeMessage('initialize-user')
  async handleUser(@MessageBody() payload: any, @ConnectedSocket() client: Socket) {
    const currentUser = await this.userService.getUserById(payload.userId)
    const userToChat = await this.userService.getUserById(payload.userToChatId)
    const messages = await this.chatService.getAllMessages()
    
    // client.join("user-room")

    this.server.emit('users', { currentUser: currentUser, userToChat: userToChat, messages: messages })
  }

  @SubscribeMessage('new-message')
  async handleNewMessage(@MessageBody() payload: any) {
    const newMessageDto = new CreateMessageDto(
      payload.firstUser.id,
      payload.secondUser.id,
      payload.content
    );

    try {
      const addedMessage = await this.chatService.addMessage(newMessageDto)
      
      // this.server.to('user-room').emit('send-new-message', {
      //   message: addedMessage,
      //   creator: `${payload.firstUser.firstName} ${payload.firstUser.lastName} (${payload.firstUser.username})`
      // })

      this.server.emit('send-new-message', {
        message: addedMessage,
        creator: `${payload.firstUser.firstName} ${payload.firstUser.lastName} (${payload.firstUser.username})`
      })

      console.log("New message: ", addedMessage)
    } catch {
      console.log("Something went wrong!")
    }

    console.log(payload)
  }
}