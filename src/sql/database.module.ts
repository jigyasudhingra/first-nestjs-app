// database.module.ts

import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database-config.service';

@Module({
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [DatabaseModule],
          inject: [DatabaseConfigService],
          useFactory: (configService: DatabaseConfigService) =>
            configService.getDatabaseConfig(),
        }),
      ],
    };
  }
}
