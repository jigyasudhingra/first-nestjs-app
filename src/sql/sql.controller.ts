import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersRepo } from './sql.repository';
import { User } from './sql.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersRepo: UsersRepo) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersRepo.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: number): Promise<User> {
  //     return this.usersRepo.findOne(id);
  //   }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersRepo.create(user);
  }

  //   @Put(':id')
  //   update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
  //     return this.usersRepo.update(id, user);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: number): Promise<void> {
  //     return this.usersRepo.remove(id);
  //   }
}
