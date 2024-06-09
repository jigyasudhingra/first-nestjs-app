import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { UserIdentityRepository } from './mongo.repository';
import { UserIdentity, UserIdentityDocument } from './mongo.schema';

@Injectable()
export class MongoService {
  constructor(private readonly userIdentityRepo: UserIdentityRepository) {}

  async create(
    userIdentityData: Omit<UserIdentity, 'id'>,
  ): Promise<UserIdentity> {
    const userIdentity = await this.userIdentityRepo.create(userIdentityData);

    return userIdentity;
  }

  async findByEmail(email: string) {
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
