import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './sql/sql.module';

@Module({
  imports: [DatabaseModule.forRoot('mysql'), UsersModule],
})
export class AppModule {}
