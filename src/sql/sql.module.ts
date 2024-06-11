import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './sql.entity';
import { UsersRepo } from './sql.repository';
import { DatabaseModule } from 'src/sql/database.module';
import { SqlService } from './sql.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule.forRoot(), TypeOrmModule.forFeature([User])],
  providers: [SqlService, UsersRepo, ConfigService],
  exports: [SqlService, UsersRepo],
})
export class UsersModule {}
