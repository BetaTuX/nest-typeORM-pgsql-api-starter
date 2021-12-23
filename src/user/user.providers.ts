import { User } from './entities/user.entity';
import { CONNECTION, REPOSITORY_USER } from '../database/database.constants';
import { Connection } from 'typeorm';

export const userProviders = [
  {
    provide: REPOSITORY_USER,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [CONNECTION],
  },
];
