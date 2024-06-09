// database-config.service.ts

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { postgresConfig } from './typeorm.config.postgres';
import { mysqlConfig } from './typeorm.config.mysql';

@Injectable()
export class DatabaseConfigService {
  getDatabaseConfig(dbType: string): TypeOrmModuleOptions {
    switch (dbType) {
      case 'postgres':
        return postgresConfig;
      case 'mysql':
        return mysqlConfig;
      default:
        throw new Error(`Database type '${dbType}' is not supported.`);
    }
  }
}
