import { Injectable } from '@nestjs/common';
import { SqlService } from './sql/sql.service';

@Injectable()
export class AppService {
  constructor(private readonly userIdentityRepo: SqlService) {}

  // ------ Mongo ------
  //   async create(
  //     userIdentityData: Omit<UserIdentity, 'id'>,
  //   ): Promise<UserIdentity> {
  //     const userIdentity = await this.userIdentityRepo.create(userIdentityData);

  //     return userIdentity;
  //   }

  // ----- SQL -------
  //   async create(
  //     userIdentityData: Omit<User, 'id'>,
  //   ): Promise<User> {
  //     const userIdentity = await this.userIdentityRepo.create(userIdentityData);

  //     return userIdentity;
  //   }

  //   async findByEmail(email: string) {
  //     const userIdentity = await this.userIdentityRepo.findOne({ email });
  //     if (!userIdentity) {
  //       throw new HttpException(
  //         {
  //           statusCode: 400,
  //           messageCode: 'INVALID_EMAIL',
  //           error: 'Email is invalid',
  //         },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     return userIdentity;
  //   }

  //   async findOrCreate(
  //     filter: FilterQuery<UserIdentityDocument>,
  //     userIdentityData: Omit<UserIdentity, 'id' | 'createdAt' | 'updatedAt'>,
  //   ): Promise<{ isNew: boolean; data: UserIdentity }> {
  //     return this.userIdentityRepo.findOrCreate(filter, userIdentityData);
  //   }
}
