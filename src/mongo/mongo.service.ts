import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { MongoRepo } from './mongo.repository';
import { UserIdentity, UserIdentityDocument } from './mongo.schema';
import { DbService } from 'src/auth/auth.service';

@Injectable()
export class MongoService extends DbService<UserIdentity> {
  constructor(private readonly userIdentityRepo: MongoRepo) {
    super();
  }

  async create(
    userIdentityData: Omit<UserIdentity, 'id'>,
  ): Promise<UserIdentity> {
    console.log('mongo create');
    const userIdentity = await this.userIdentityRepo.create(userIdentityData);

    return userIdentity;
  }

  async findByEmail(email: string): Promise<UserIdentity | null> {
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
    filter: FilterQuery<UserIdentityDocument>,
    userIdentityData: Omit<UserIdentity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<{ isNew: boolean; data: UserIdentity }> {
    return this.userIdentityRepo.findOrCreate(filter, userIdentityData);
  }
}
