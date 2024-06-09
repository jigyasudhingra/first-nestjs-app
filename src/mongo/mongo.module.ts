import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserIdentity, UserIdentitySchema } from './mongo.schema';
import { MongoRepo } from './mongo.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    MongooseModule.forFeature([
      { name: UserIdentity.name, schema: UserIdentitySchema },
    ]),
  ],
  providers: [MongoService, MongoRepo],
  exports: [MongoService, MongoRepo],
})
export class MongoModule {}

//mongodb://localhost:27017/nest_app
