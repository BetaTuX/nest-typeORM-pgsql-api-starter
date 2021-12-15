import { User } from './entities/user.entity';
import { REPOSITORY_USER } from '../constants/database.constants';
import { Connection } from 'typeorm';

export const userProviders = [
  {
    provide: REPOSITORY_USER,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
