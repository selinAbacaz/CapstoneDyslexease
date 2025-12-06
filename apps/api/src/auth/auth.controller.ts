import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Auth, TokenOut } from '@repo/api/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtUser } from 'src/strategies/jwt.strategy';
import { CurrentUserRefresh } from 'src/decorators/current-user-refresh.decorator';
import { JwtUserRefresh } from 'src/strategies/jwt-refresh.strategy';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() signUpDto: Auth,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenOut> {
    return this.authService.signUp(signUpDto, response);
  }

  @Post('login')
  @HttpCode(200)
  login(
    @Body() loginDto: Auth,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenOut> {
    return this.authService.login(loginDto, response);
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  logout(
    @CurrentUser() user: JwtUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user.user_cuid, response);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt-refresh'))
  checkRefresh(
    @CurrentUserRefresh() user: JwtUserRefresh,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenOut> {
    return this.authService.checkRefresh(
      user.user_cuid,
      user.refreshToken,
      response,
    );
  }
}
