import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { databaseProviders } from '../database/database.providers';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, ...userProviders, ...databaseProviders],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
