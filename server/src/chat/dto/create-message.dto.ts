import { IsString } from 'class-validator'

export class CreateMessageDto {
    @IsString()
    readonly firstUserId: string

    @IsString()
    readonly secondUserId: string

    @IsString()
    readonly content: string

    constructor(firstUserId: string = "", secondUserId: string = "", content: string = "") {
        this.firstUserId = firstUserId
        this.secondUserId = secondUserId
        this.content = content
    }
}