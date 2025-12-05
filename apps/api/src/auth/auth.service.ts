import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Auth, TokenOut } from '@repo/api/auth';
import { JwtService } from '@nestjs/jwt';
import { UserOut } from '@repo/api/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateTokens({
    user_cuid,
    username,
    email,
  }: UserOut): Promise<TokenOut> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user_cuid, username, email },
        { expiresIn: '2m', secret: process.env.JWT_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: user_cuid, username, email },
        { expiresIn: '10m', secret: process.env.JWT_SECRET },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async signUp(signUpDto: Auth): Promise<TokenOut> {
    const hash_password = await bcrypt.hash(signUpDto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        username: signUpDto.username,
        password_hash: hash_password,
        email: signUpDto.email,
      },
      select: {
        user_cuid: true,
        username: true,
        email: true,
        user_pref_cuid: true,
      },
    });

    return this.generateTokens(newUser);
  }

  async login(loginDto: Auth): Promise<TokenOut> {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) throw new NotFoundException('Incorrect Credentials!');

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Incorrect Credentials!');
    }

    return this.generateTokens(user);
  }
}
