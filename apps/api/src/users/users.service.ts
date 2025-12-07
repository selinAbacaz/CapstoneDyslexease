import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserOut } from '@repo/api/user';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne(user_cuid: string): Promise<UserOut> {
    return this.prisma.user.findUnique({
      where: { user_cuid },
      select: {
        user_cuid: true,
        username: true,
        email: true,
      },
    });
  }
}
