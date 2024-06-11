import { Module } from '@nestjs/common';
import { DynamicModuleLoader } from 'src/dynamic-module-loader.module';
import { AuthService } from './auth.service';
import { MongoService } from 'src/mongo/mongo.service';
import { SqlService } from 'src/sql/sql.service';

@Module({
  imports: [DynamicModuleLoader.forRoot()],
  providers: [
    AuthService,
    {
      provide: 'DbService',
      useClass: process.env.DB === 'mongo' ? MongoService : SqlService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
