import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
export declare class RoomService {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    getAllRooms(): Promise<Room[]>;
    createRoom(roomDto: CreateRoomDto): Promise<Room>;
    getRoomByUsersId(ids: string[]): Promise<Room>;
}
