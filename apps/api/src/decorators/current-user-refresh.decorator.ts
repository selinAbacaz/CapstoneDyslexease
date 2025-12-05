import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserRefresh } from 'src/strategies/jwt-refresh.strategy';

export const CurrentUserRefresh = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUserRefresh => {
    const req = ctx.switchToHttp().getRequest();
    return req.user as JwtUserRefresh;
  },
);
