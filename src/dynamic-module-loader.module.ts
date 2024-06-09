import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { UsersModule } from './sql/sql.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Optional if the file is named '.env' and located in the root directory
      isGlobal: true, // Makes the ConfigModule global, so you don't need to import it in other modules
    }),
  ],
})
export class DynamicModuleLoader {
  static forRoot(): DynamicModule {
    const configService = new ConfigService();
    const dbType = configService.get<string>('DB');
    console.log(dbType);
    return {
      module: DynamicModuleLoader,
      imports: [dbType === 'mongo' ? MongoModule : UsersModule],
      exports: [dbType === 'mongo' ? MongoModule : UsersModule],
      providers: [
        {
          provide: 'db_type',
          useValue: dbType,
        },
      ],
    };
  }
}
