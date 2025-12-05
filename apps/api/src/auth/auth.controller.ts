import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '@repo/api/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: Auth) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: Auth) {
    return this.authService.login(loginDto);
  }
}
