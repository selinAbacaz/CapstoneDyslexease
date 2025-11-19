import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserOut } from '@repo/api/user';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<UserOut[]> {
    return this.prisma.user.findMany({
      select: {
        user_cuid: true,
        username: true,
        email: true,
        user_pref_cuid: true,
      },
    });
  }
}
