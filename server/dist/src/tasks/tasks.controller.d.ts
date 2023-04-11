import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from "./tasks.entity";
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getAll(): Promise<Task[]>;
    getOne(id: number): Promise<Task | Boolean>;
    create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        status: number;
        message: string;
    }>;
    delete(id: number): Promise<{
        status: number;
        message: string;
    }>;
}
