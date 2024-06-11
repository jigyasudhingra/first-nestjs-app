import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  //   private service: MongoService | UsersService;
  //   private dbType: string;
  //   constructor(
  //     @Optional()
  //     @Inject(forwardRef(() => MongoService))
  //     private readonly mongoService: MongoService,
  //     @Optional()
  //     @Inject(forwardRef(() => UsersService))
  //     private readonly usersService: UsersService,
  //   ) {
  //     const configService = new ConfigService();
  //     this.dbType = configService.get<string>('DB');
  //     this.service =
  //       this.dbType === 'mongo' ? this.mongoService : this.usersService;
  //   }
  //   @Get()
  //   async find(): Promise<any> {
  //     return await this.service.findByEmail();
  //   }
  //   constructor(@Inject('auth_service') private readonly service: MongoService) {}
  //   constructor(@Inject('auth_service') private readonly service) {}
  constructor(private readonly service: AuthService) {}
  @Post()
  async create(@Body() user) {
    return await this.service.create(user);
  }

  @Get()
  async find(@Body() user) {
    return await this.service.findByEmail(user.email);
  }
}
