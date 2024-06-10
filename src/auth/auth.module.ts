import { Module } from '@nestjs/common';
import { DynamicModuleLoader } from 'src/dynamic-module-loader.module';
import { AuthService, DbService } from './auth.service';
import { UserIdentity } from 'src/mongo/mongo.schema';
import { User } from 'src/sql/sql.entity';
import { MongoService } from 'src/mongo/mongo.service';
import { UsersService } from 'src/sql/sql.service';

@Module({
  imports: [DynamicModuleLoader.forRoot()],
  //   providers: [
  //     {
  //       provide: 'auth_service',
  //       useClass: process.env.DB === 'mongo' ? MongoService : UsersService,
  //     },
  //   ],
  //   exports: ['auth_service'],
  providers: [
    AuthService,
    {
      provide: 'DbService',
      useClass: process.env.DB === 'mongo' ? MongoService : UsersService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
