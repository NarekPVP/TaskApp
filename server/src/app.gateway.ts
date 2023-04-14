import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user/user.service';
import { CreateMessageDto } from './chat/dto/create-message.dto';
import { ChatService } from './chat/chat.service';
import { HttpException, HttpStatus, OnModuleInit } from '@nestjs/common';
import { RoomService } from './room/room.service';
import { CreateRoomDto } from './room/dto/create-room.dto';

@WebSocketGateway(5297, {
  cors: {
    origin: "*"
  }
})
export class AppGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(readonly userService: UserService, readonly chatService: ChatService, readonly roomService: RoomService) {}
  
  onModuleInit() {
    this.server.on('connection', (socket) => {
      socket.on('get-user-ids', async (ids) => {
        console.log("ids: " + ids);
        const currentRoom = await this.roomService.getRoomByUsersId([ids.userToChatId, ids.currentUserId])
        
        if(!currentRoom) {
          console.log("Room not found creating new one")
          const roomDto = new CreateRoomDto()
          roomDto.users = [ids.userToChatId, ids.currentUserId]
          await this.roomService.createRoom(roomDto)
          this.onModuleInit()
        }

        socket.join(`room-${currentRoom.id}`)
      });
    })
  }
  
  @SubscribeMessage('new-message')
  async handleNewMessage(@MessageBody() payload: any, client: Socket) {
    console.log(payload)
    
    const newMessageDto = new CreateMessageDto(
      payload.currentUserId,
      payload.userToChatId,
      payload.content
    )
    
    const currentRoom = await this.roomService.getRoomByUsersId([payload.userToChatId, payload.currentUserId])

    // const roomName = payload.currentUserId + "-" + payload.userToChatId
    const roomName = `room-${currentRoom.id}`
    // client.join(roomName)

    try {
      const currentUser = await this.userService.getUserById(payload.currentUserId)
      const userToChatWith = await this.userService.getUserById(payload.userToChatId)

      if(!currentUser && !userToChatWith) {
        throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
      }

      const addedMessage = await this.chatService.addMessage(newMessageDto)

      this.server.to(roomName).emit('send-new-message', {
        message: addedMessage,
        room: roomName,
        creator: `${currentUser.firstName} ${currentUser.lastName} (${currentUser.username})`
      })

    } catch(err) {
      console.log(err)
      throw new HttpException("Something went wrong please try again later!", HttpStatus.BAD_REQUEST)
    }
  }
}

// this.server.to('user-room').emit('send-new-message', {
//   message: addedMessage,
//   creator: `${payload.firstUser.firstName} ${payload.firstUser.lastName} (${payload.firstUser.username})`
// })
