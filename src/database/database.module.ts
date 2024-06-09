// database.module.ts

import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database-config.service';

@Module({
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseModule {
  static forRoot(dbType: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [DatabaseModule],
          inject: [DatabaseConfigService],
          useFactory: (configService: DatabaseConfigService) =>
            configService.getDatabaseConfig(dbType),
        }),
      ],
    };
  }
}
