import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteResult } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../user/entities/user.entity';
import { REPOSITORY_TASK } from '../database/database.constants';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @Inject(REPOSITORY_TASK) private taskRepository: TaskRepository,
  ) {}

  async create(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = new Task();

    task.title = createTaskDto.title;
    task.author = user;
    if (!Array.isArray(createTaskDto.tag)) {
      createTaskDto.tag = [createTaskDto.tag];
    }
    task.tag = createTaskDto.tag;
    if (createTaskDto.parent) {
      task.parent = await this.taskRepository.findOneOrFail({
        where: { id: createTaskDto.parent },
      });
    }
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.findTrees();
  }

  async findOne(id: string): Promise<Task> {
    const task: Task = await this.taskRepository.findOne({ where: { id } });

    if (task) {
      await this.addParentToTask(task);
      await this.addChildrenToTask(task);
    }
    return task;
  }

  async update(author: User, id: string, updateTaskDto: UpdateTaskDto) {
    const task: Task = await this.taskRepository.findOneOrFail({
      where: { id, author },
    });
    if (updateTaskDto.title) task.title = updateTaskDto.title;
    if (!Array.isArray(updateTaskDto.tag)) {
      updateTaskDto.tag = [updateTaskDto.tag];
    }
    task.tag = updateTaskDto.tag;
    return this.taskRepository.save(task);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }

  private async addParentToTask(task: Task) {
    const parents = await this.taskRepository.findAncestors(task);
    const parent: Task = parents.filter((element) => element.id !== task.id)[0];

    task.parent = parent && parent.id !== task.id ? parent : null;
    return task;
  }

  private async addChildrenToTask(task: Task) {
    const tree = await this.taskRepository.findDescendantsTree(task, {
      depth: 1,
    });

    for (const value of tree.children) {
      value.childrenCount = await this.taskRepository.countDescendants(value);
      value.childrenCount -= 1;
    }
    task.children = tree.children;
    return task;
  }
}
