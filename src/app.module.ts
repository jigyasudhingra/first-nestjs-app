import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
@Module({
  // imports: [DatabaseModule.forRoot('mysql'), MongoModule, UsersModule],
  // imports: [MongoModule, UsersModule],
  imports: [AuthModule],
  controllers: [AppController],
})
export class AppModule {}
