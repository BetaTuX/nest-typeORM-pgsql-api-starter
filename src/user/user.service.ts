import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { REPOSITORY_USER } from '../database/database.constants';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY_USER)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findOneByMail(mail: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { mail },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }
}
