import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './sql.entity';

@Injectable()
export class UsersRepo {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    console.log('sql');
  }

  async create(userIdentityData: Omit<User, 'id'>): Promise<User> {
    const userIdentityInstance = this.userRepository.create(userIdentityData);
    const data = await this.userRepository.save(userIdentityInstance);
    return data;
  }

  // TODO: Type of query
  async findOne(query: any): Promise<User> {
    return await this.userRepository.findOne({ where: query });
  }

  async findOrCreate(
    query: any,
    modelData: User,
  ): Promise<{ isNew: boolean; data: User }> {
    let data = await this.findOne(query);

    if (data) {
      return {
        isNew: false,
        data,
      };
    }
    data = await this.create(modelData);

    return {
      isNew: true,
      data,
    };
  }

  //   async findAll(): Promise<User[]> {
  //     return this.userRepository.find();
  //   }

  //   async findOne(id: number): Promise<User> {
  //     return this.userRepository.findOneBy({ id });
  //   }

  //   async create(user: User): Promise<User> {
  //     return this.userRepository.save(user);
  //   }

  //   async update(id: number, user: Partial<User>): Promise<User> {
  //     await this.userRepository.update(id, user);
  //     return this.findOne(id);
  //   }

  //   async remove(id: number): Promise<void> {
  //     await this.userRepository.delete(id);
  //   }
}
