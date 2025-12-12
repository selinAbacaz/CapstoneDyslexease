import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUser, UserOut } from '@repo/api/user';

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
        selected_file_cuid: true,
      },
    });
  }

  async updateUser(
    updateUserDto: UpdateUser,
    user_cuid: string,
  ): Promise<UserOut> {
    if (updateUserDto.selected_file_cuid) {
      const file = await this.prisma.file.findUnique({
        where: { file_cuid: updateUserDto.selected_file_cuid },
      });

      if (!file) throw new NotFoundException('Does not exist!');
      if (file.user_cuid !== user_cuid) {
        throw new ForbiddenException('Access Denied');
      }
    }

    return this.prisma.user.update({
      where: { user_cuid },
      data: updateUserDto,
      select: {
        user_cuid: true,
        username: true,
        email: true,
        selected_file_cuid: true,
      },
    });
  }
}
