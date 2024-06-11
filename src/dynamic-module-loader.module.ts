import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { UsersModule } from './sql/sql.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class DynamicModuleLoader {
  static forRoot(): DynamicModule {
    const configService = new ConfigService();
    const dbType = configService.get<string>('DB');

    return {
      module: DynamicModuleLoader,
      imports: [dbType === 'mongo' ? MongoModule : UsersModule],
      exports: [dbType === 'mongo' ? MongoModule : UsersModule],
    };
  }
}
