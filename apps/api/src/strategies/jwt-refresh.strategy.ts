import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(
    request: Request,
    { sub, username, email }: JwtPayload,
  ): JwtUserRefresh {
    const refreshToken = request.headers['authorization']
      .replace('Bearer', '')
      .trim();
    const newJwtUserRefresh: JwtUserRefresh = {
      user_cuid: sub,
      username,
      email,
      refreshToken,
    };
    return newJwtUserRefresh;
  }
}
