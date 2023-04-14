import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>
    ) {}
    
    async getAllRooms() {
        return await this.roomRepository.find()
    }

    async createRoom(roomDto: CreateRoomDto) {
        const newRoom = await this.roomRepository.create({
            users: roomDto.users.join('|')
        })

        await this.roomRepository.save(newRoom)

        return newRoom
    }

    async getRoomByUsersId(ids: string[]) {
        const query = this.roomRepository.createQueryBuilder('room');
        
        for (const userId of ids) {
          query.andWhere(`room.users LIKE '%${userId}%'`);
        }

        return await query.getOne();
    }
}
