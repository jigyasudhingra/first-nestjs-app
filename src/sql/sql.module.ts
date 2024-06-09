import { Module } from '@nestjs/common';
import { UsersController } from './sql.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './sql.entity';
import { UsersRepo } from './sql.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './sql.service';

@Module({
  imports: [DatabaseModule.forRoot('mysql'), TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepo],
  exports: [UsersService, UsersRepo],
})
export class UsersModule {}
