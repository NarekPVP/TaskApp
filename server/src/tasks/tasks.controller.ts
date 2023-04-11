import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from "./tasks.entity";
import { REQUEST } from '@nestjs/core';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getAll(): Promise<Task[]> {
        return await this.tasksService.getAllTasks();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Task|Boolean> {
        try {
            return await this.tasksService.getTaskById(id);
        } catch {
            throw new HttpException(`Task not found with specified id: ${id}`, HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
        return await this.tasksService.createTask(createTaskDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<{ status: number, message: string }> {
        try {
            await this.tasksService.getTaskById(id);
            await this.tasksService.updateTask(id, updateTaskDto);
            return { status: HttpStatus.OK, message: "task has been updated" }
        } catch {
            throw new HttpException(
                'Task credentials are not correct', HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: number): Promise<{ status: number, message: string }> {
        try {
            await this.tasksService.deleteTask(id);
            return { status: HttpStatus.OK, message: `Task with id: ${id} has been deleted` }
        } catch {
            throw new HttpException(`Task with specified id ${id} not found!`, HttpStatus.NOT_FOUND);
        }
    }
}