import { CONNECTION } from './database.constants';
import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfiguration } from '../config/configuration';

export const databaseProviders = [
  {
    provide: CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const env = process.env?.NODE_ENV || 'prod';
      const dbConfig = configService.get<DatabaseConfiguration>(`db.${env}`);

      return await createConnection({
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port || 5432,
        username: dbConfig.user,
        password: dbConfig.pass,
        database: dbConfig.name,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
    },
  },
];
