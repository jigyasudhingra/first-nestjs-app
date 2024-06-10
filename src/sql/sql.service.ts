import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepo } from './sql.repository';
import { User } from './sql.entity';
import { DbService } from 'src/auth/auth.service';

@Injectable()
export class UsersService extends DbService<User> {
  constructor(private readonly userIdentityRepo: UsersRepo) {
    super();
  }

  async create(userIdentityData: Omit<User, 'id'>): Promise<User> {
    const userIdentity = await this.userIdentityRepo.create(userIdentityData);

    return userIdentity;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userIdentity = await this.userIdentityRepo.findOne({ email });
    if (!userIdentity) {
      throw new HttpException(
        {
          statusCode: 400,
          messageCode: 'INVALID_EMAIL',
          error: 'Email is invalid',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return userIdentity;
  }

  async findOrCreate(
    filter: any,
    userIdentityData: Omit<User, 'id'>,
  ): Promise<{ isNew: boolean; data: User }> {
    return this.userIdentityRepo.findOrCreate(filter, userIdentityData);
  }
}
