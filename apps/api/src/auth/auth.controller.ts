import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Auth, TokenOut } from '@repo/api/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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
  logout() {}
}
