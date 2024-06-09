import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserIdentity, UserIdentityDocument } from './mongo.schema';

@Injectable()
export class MongoRepo {
  constructor(
    @InjectModel(UserIdentity.name)
    private readonly model: Model<UserIdentityDocument>,
  ) {
    console.log('mongo');
  }

  async create(
    userIdentityData: Omit<UserIdentity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserIdentity> {
    const userIdentityInstance = new this.model(userIdentityData);
    const data = (await userIdentityInstance.save()).toObject();
    return new UserIdentity(data);
  }

  async findOne(
    query: FilterQuery<UserIdentityDocument>,
  ): Promise<UserIdentity> {
    const instance = await this.model.findOne(query);
    if (!instance) return null;
    return new UserIdentity(instance.toObject());
  }

  async findOrCreate(
    query: FilterQuery<UserIdentityDocument>,
    modelData: Omit<UserIdentity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<{ isNew: boolean; data: UserIdentity }> {
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
}
