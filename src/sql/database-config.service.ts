// database-config.service.ts

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { postgresConfig } from './typeorm.config.postgres';
import { mysqlConfig } from './typeorm.config.mysql';

@Injectable()
export class DatabaseConfigService {
  getDatabaseConfig(): TypeOrmModuleOptions {
    switch (process.env.SQL_DB) {
      case 'postgres':
        console.log('postgres');
        return postgresConfig;
      case 'mysql':
        console.log('mysql');
        return mysqlConfig;
      default:
        throw new Error(
          `Database type '${process.env.SQL_DB}' is not supported.`,
        );
    }
  }
}
