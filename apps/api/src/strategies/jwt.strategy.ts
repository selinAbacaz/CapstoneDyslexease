import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

type JwtUser = {
  user_cuid: string;
  username: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  validate({ sub, username, email }: JwtPayload): JwtUser {
    const newJwtUser: JwtUser = { user_cuid: sub, username, email };
    return newJwtUser;
  }
}
