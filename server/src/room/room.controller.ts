import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    async getAllRooms() {
        return await this.roomService.getAllRooms()
    }

    @Get(':users')
    async getUsersRoom(@Param() params) {
        const users = params.users
        const userIds: string[] = users.split('|')
        
        const room = this.roomService.getRoomByUsersId(userIds)

        return room
    }

    @Post()
    async createRoom(@Body() params) : Promise<CreateRoomDto> {
        const roomDto = new CreateRoomDto()
        roomDto.users = params.users

        await this.roomService.createRoom(roomDto)
        return roomDto
    }
}
