import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../sql/sql.entity';

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  //   password: 'your-password', // I haven't used any password while creating database, so I emit it
  database: 'demo1',
  entities: [User],
  synchronize: true,
};
