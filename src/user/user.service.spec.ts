import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { ConfigService } from '@nestjs/config';
import { testDatabaseProviders } from '../database/database-test.providers';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ConfigService,
        ...userProviders,
        ...testDatabaseProviders,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
