import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Auth, TokenOut } from '@repo/api/auth';
import { JwtService } from '@nestjs/jwt';
import { UserOut } from '@repo/api/user';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@repo/database';

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
        { expiresIn: '2m', secret: process.env.JWT_ACCESS_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: user_cuid, username, email },
        { expiresIn: '10m', secret: process.env.JWT_REFRESH_SECRET },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(user_cuid: string, refreshToken: string) {
    const refresh_token_hash = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { user_cuid },
      data: { refresh_token_hash },
    });
  }

  async signUp(signUpDto: Auth): Promise<TokenOut> {
    const hash_password = await bcrypt.hash(signUpDto.password, 10);

    let newUser: UserOut;
    try {
      newUser = await this.prisma.user.create({
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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `A user with that information already exists`,
        );
      }
      throw error;
    }

    const tokens = await this.generateTokens(newUser);
    await this.updateRefreshToken(newUser.user_cuid, tokens.refreshToken);

    return tokens;
  }

  async login(loginDto: Auth): Promise<TokenOut> {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) throw new ForbiddenException('Incorrect Credentials!');

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Incorrect Credentials!');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.user_cuid, tokens.refreshToken);

    return tokens;
  }

  async logout(user_cuid: string) {
    await this.prisma.user.update({
      where: { user_cuid },
      data: { refresh_token_hash: null },
    });
  }

  async checkRefresh(user_cuid: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { user_cuid } });

    if (!user) throw new ForbiddenException('Access Denied');

    const isValidToken = bcrypt.compare(refreshToken, user.refresh_token_hash);

    if (!isValidToken) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.user_cuid, tokens.refreshToken);

    return tokens;
  }
}
