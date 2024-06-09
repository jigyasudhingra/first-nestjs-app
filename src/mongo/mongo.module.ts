import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserIdentity, UserIdentitySchema } from './mongo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserIdentity.name, schema: UserIdentitySchema },
    ]),
  ],
  providers: [MongoService],
})
export class MongoModule {}

//mongodb://localhost:27017/nest_app
