import { CONNECTION } from '../constants/database.constants';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'local_pass',
        database: 'better_shop',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
