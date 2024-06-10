import { Inject, Injectable } from '@nestjs/common';
import { UserIdentity } from 'src/mongo/mongo.schema';
import { MongoService } from 'src/mongo/mongo.service';
import { User } from 'src/sql/sql.entity';
import { UsersService } from 'src/sql/sql.service';

export abstract class DbService<T> {
  abstract create(data: Omit<T, 'id'>): Promise<T>;
  abstract findByEmail(email: string): Promise<T | null>;
  abstract findOrCreate(
    filter: any,
    data: Omit<T, 'id'>,
  ): Promise<{ isNew: boolean; data: T }>;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('DbService')
    private readonly dbService: DbService<User | UserIdentity>,
  ) {}
  async create(
    user: Omit<User | UserIdentity, 'id'>,
  ): Promise<User | UserIdentity> {
    return this.dbService.create(user);
  }
  async findByEmail(email: string): Promise<User | UserIdentity | null> {
    return this.dbService.findByEmail(email);
  }
  async findOrCreate(
    filter: any,
    userData: Omit<User | UserIdentity, 'id'>,
  ): Promise<{ isNew: boolean; data: User | UserIdentity }> {
    return this.dbService.findOrCreate(filter, userData);
  }
}
