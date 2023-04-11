import { Test, TestingModule } from '@nestjs/testing';
import { Task } from "./tasks.entity";
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
    let service: TasksService;
    let repository: Repository<Task>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksService],
        }).compile();

        service = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll methods tests', () => {
        it('should return all tasks', () => {
            const tasks = service.getAllTasks();
            expect(tasks).toBeDefined();
        })
    });

    describe('getTaskById method tests', () => {
        it('should return task by id', () => {
            const id = 1;
            const task = service.getTaskById(id);
            expect(task).toBeDefined();
        })

        it('should return NotFoundException', () => {
            const id = 2222;
            try {
                const task = service.getTaskById(id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        })
    });

    describe('createTask method tests', () => {
        it('should create a task with given title and description', () => {
            const newTask = service.createTask({
                title: "Task for unit test",
                description: "Task for unit test description"
            });

            expect(newTask).toBeInstanceOf(Task);
        });
    });

    describe("updateTask method tests", () => {
        it('should update a task with given title', async () => {
            const id = 8;
            service.updateTask(id, {
                title: "Task for unit test"
            });

            let updatedTask = service.getTaskById(id);

            expect((await updatedTask).title).toEqual("Task for unit test");
        });

        it('should return NotFound Exception', () => {
            const id = 2222;
            try {
                service.updateTask(id, {});
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException);
            }
        });
    });
});