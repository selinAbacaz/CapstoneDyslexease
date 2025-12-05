import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export interface JwtUserRefresh {
  user_cuid: string;
  username: string;
  email: string;
  refreshToken: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => this.extractToken(request),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  extractToken(request: Request) {
    const cookies = request.headers.cookie?.split('; ');
    if (!cookies?.length) {
      return null;
    }

    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith(`refresh=`),
    );

    if (!refreshTokenCookie) {
      return null;
    }

    return refreshTokenCookie.split('=')[1];
  }

  validate(
    request: Request,
    { sub, username, email }: JwtPayload,
  ): JwtUserRefresh {
    const refreshToken = this.extractToken(request);
    const newJwtUserRefresh: JwtUserRefresh = {
      user_cuid: sub,
      username,
      email,
      refreshToken,
    };
    return newJwtUserRefresh;
  }
}
