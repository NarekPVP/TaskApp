import { IsString, Length } from "class-validator"

export class UpdateTaskDto {
    @IsString()
    @Length(5, 100)
    readonly title?: string

    @IsString()
    readonly description?: string

    @IsString()
    readonly updatedAt?: Date
}