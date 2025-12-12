import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UpdateUser, UserOut } from '@repo/api/user';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtUser } from 'src/strategies/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  find(@CurrentUser() user: JwtUser): Promise<UserOut> {
    return this.userService.findOne(user.user_cuid);
  }

  @Patch('/me')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Body() updateUserDto: UpdateUser,
    @CurrentUser() user: JwtUser,
  ): Promise<UserOut> {
    return this.userService.updateUser(updateUserDto, user.user_cuid);
  }
}
