import { Controller, Get } from '@nestjs/common';
import { UserOut } from '@repo/api/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(): Promise<UserOut[]> {
    return this.userService.findAll();
  }
}
