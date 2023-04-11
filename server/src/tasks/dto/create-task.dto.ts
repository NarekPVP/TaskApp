import { IsString, IsDate, Length } from "class-validator"

export class CreateTaskDto {
    @IsString()
    @Length(5, 100)
    readonly title: string

    @IsString()
    readonly userId: string

    @IsString()
    readonly description: string

    @IsString()
    createdAt?: Date = new Date()
}