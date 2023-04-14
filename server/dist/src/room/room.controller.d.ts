import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    getAllRooms(): Promise<import("./room.entity").Room[]>;
    getUsersRoom(params: any): Promise<import("./room.entity").Room>;
    createRoom(params: any): Promise<CreateRoomDto>;
}
