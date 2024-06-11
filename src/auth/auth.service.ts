import { Inject, Injectable } from '@nestjs/common';
import { UserIdentity } from 'src/mongo/mongo.schema';
import { User } from 'src/sql/sql.entity';

export abstract class DbService<T> {
  abstract create(data: Omit<T, 'id'>): Promise<T>;
  abstract findByEmail(email: string): Promise<T | null>;
  abstract findOrCreate(
    filter: any,
    data: Omit<T, 'id'>,
  ): Promise<{ isNew: boolean; data: T }>;
}

type UserType = User | UserIdentity;
@Injectable()
export class AuthService {
  constructor(
    @Inject('DbService')
    private readonly dbService: DbService<UserType>,
  ) {}

  async create(user: Omit<UserType, 'id'>): Promise<UserType> {
    return this.dbService.create(user);
  }

  async findByEmail(email: string): Promise<UserType> {
    return this.dbService.findByEmail(email);
  }

  async findOrCreate(
    filter: any,
    userData: Omit<UserType, 'id'>,
  ): Promise<{ isNew: boolean; data: UserType }> {
    return this.dbService.findOrCreate(filter, userData);
  }
}
