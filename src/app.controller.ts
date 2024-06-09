import {
  Body,
  Controller,
  Get,
  Inject,
  Optional,
  Post,
  forwardRef,
} from '@nestjs/common';
import { MongoService } from './mongo/mongo.service';
import { UsersService } from './sql/sql.service';
import { UserIdentity } from './mongo/mongo.schema';
import { User } from './sql/sql.entity';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private service: MongoService | UsersService;
  private dbType: string;
  constructor(
    @Optional()
    @Inject(forwardRef(() => MongoService))
    private readonly mongoService: MongoService,
    @Optional()
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {
    const configService = new ConfigService();
    this.dbType = configService.get<string>('DB');
    this.service =
      this.dbType === 'mongo' ? this.mongoService : this.usersService;
  }

  //   @Get()
  //   async find(): Promise<any> {
  //     return await this.service.findByEmail();
  //   }

  @Post()
  async create(@Body() user) {
    console.log('fr3', this.dbType);
    return await this.service.create(user);
  }
}
