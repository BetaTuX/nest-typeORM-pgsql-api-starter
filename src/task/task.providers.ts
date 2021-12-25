import { Connection } from 'typeorm';
import { CONNECTION, REPOSITORY_TASK } from '../database/database.constants';
import { TaskRepository } from './task.repository';

export const taskProviders = [
  {
    provide: REPOSITORY_TASK,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository<TaskRepository>(TaskRepository),
    inject: [CONNECTION],
  },
];
