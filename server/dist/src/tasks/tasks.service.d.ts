import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./tasks.entity";
import { DeleteResult, Repository } from "typeorm";
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(taskDto: CreateTaskDto): Promise<CreateTaskDto>;
    updateTask(id: number, taskDto: UpdateTaskDto): Promise<void>;
    deleteTask(id: number): Promise<DeleteResult | Boolean>;
}
