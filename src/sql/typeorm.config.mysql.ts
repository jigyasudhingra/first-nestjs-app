import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './sql.entity';

export const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'mydatabase',
  entities: [User],
  synchronize: true,
};
