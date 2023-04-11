import { Controller, Get, NotFoundException, Param, Body, Post, HttpCode, HttpStatus, HttpException, Req, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<any> {
        return await this.userService.getAllUsers();
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async loginUser(@Body('username') username: string, @Body('password') password: string, @Session() session) {
        try{
            return await this.userService.loginUser(username, password);
        } catch (error) {
            throw new HttpException('Login credentials are not correct', HttpStatus.UNPROCESSABLE_ENTITY);            
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const user = await this.userService.getUserById(id);

        if (user) {
            return user;
        } else {
            throw new NotFoundException(`User with specified id ${id} not found!`);
        }
    }
}
