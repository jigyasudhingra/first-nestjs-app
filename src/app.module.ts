import { Module } from '@nestjs/common';
import { DynamicModuleLoader } from './dynamic-module-loader.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  // imports: [DatabaseModule.forRoot('mysql'), MongoModule, UsersModule],
  // imports: [MongoModule, UsersModule],
  imports: [DynamicModuleLoader.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
