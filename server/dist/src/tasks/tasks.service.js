"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_entity_1 = require("./tasks.entity");
const typeorm_2 = require("typeorm");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getAllTasks() {
        return this.taskRepository.find({
            order: {
                id: "desc"
            }
        });
    }
    async getTaskById(id) {
        const task = await this.taskRepository.findOne({
            where: {
                id: id,
            }
        });
        if (!task)
            throw new Error();
        return task;
    }
    async createTask(taskDto) {
        const newTask = await this.taskRepository.create(Object.assign({}, taskDto));
        await this.taskRepository.save(newTask);
        return newTask;
    }
    async updateTask(id, taskDto) {
        await this.taskRepository.update(id, taskDto);
    }
    async deleteTask(id) {
        if (await this.getTaskById(id)) {
            return await this.taskRepository.delete(id);
        }
        return false;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tasks_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map