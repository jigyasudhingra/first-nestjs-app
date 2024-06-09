import { Module } from '@nestjs/common';
import { UsersController } from './sql.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './sql.entity';
import { UsersRepo } from './sql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersRepo],
})
export class UsersModule {}
