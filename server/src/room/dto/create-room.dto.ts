import { IsArray } from "class-validator";

export class CreateRoomDto {
    @IsArray()
    users: string[];
}