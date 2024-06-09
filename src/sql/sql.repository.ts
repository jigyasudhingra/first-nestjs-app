import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './sql.entity';

@Injectable()
export class UsersRepo {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  //   async findOne(id: number): Promise<User> {
  //     return this.userRepository.findOneBy({ id });
  //   }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  //   async update(id: number, user: Partial<User>): Promise<User> {
  //     await this.userRepository.update(id, user);
  //     return this.findOne(id);
  //   }

  //   async remove(id: number): Promise<void> {
  //     await this.userRepository.delete(id);
  //   }
}
