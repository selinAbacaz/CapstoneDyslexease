import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Auth, TokenOut } from '@repo/api/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtUser } from 'src/strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: Auth): Promise<TokenOut> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: Auth): Promise<TokenOut> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@CurrentUser() user: JwtUser) {
    return this.authService.logout(user.user_cuid);
  }
}
