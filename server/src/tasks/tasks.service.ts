import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { NotFoundException } from '@nestjs/common'
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./tasks.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find({
            order: {
                id: "desc"
            }
        });
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { 
                id: id,
            }
        })
        
        if(!task)
            throw new Error() // go to catch block

        return task;
    }

    async createTask(taskDto: CreateTaskDto): Promise<CreateTaskDto> {
        const newTask = await this.taskRepository.create( { ...taskDto } );
        await this.taskRepository.save(newTask);

        return newTask;
    }

    async updateTask(id: number, taskDto: UpdateTaskDto): Promise<void> {
        await this.taskRepository.update(id, taskDto);
    }

    async deleteTask(id: number): Promise<DeleteResult|Boolean> {
        if(await this.getTaskById(id)) {
            return await this.taskRepository.delete(id);
        }
        
        return false;
    }
}