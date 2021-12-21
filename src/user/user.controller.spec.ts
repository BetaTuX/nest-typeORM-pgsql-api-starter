import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { databaseProviders } from '../database/database.providers';

describe('UserController', () => {
  const TEST_MAIL = 'test@test.test';
  const TEST_PASS = 'Azerty123';
  let test_id: string;
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ...userProviders, ...databaseProviders],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create user', async () => {
    const response = await controller.create({
      mail: TEST_MAIL,
      pass: TEST_PASS,
    });
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('mail', TEST_MAIL);
    test_id = response.id;
  });

  it('should be able to find a user', async () => {
    const response = await controller.findOne(test_id);

    expect(response).toHaveProperty('mail', TEST_MAIL);
  });

  it('should delete user from ID', async () => {
    expect(await controller.remove(test_id)).toBe(1);
  });
});
