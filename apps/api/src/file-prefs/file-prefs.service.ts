import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilePrefs, FilePrefsOut } from '@repo/api/file-prefs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilePrefsService {
  constructor(private prisma: PrismaService) {}

  async findPrefsByFile(
    file_cuid: string,
    user_cuid: string,
  ): Promise<FilePrefsOut> {
    const file = await this.prisma.file.findUnique({ where: { file_cuid } });

    if (!file) throw new NotFoundException('There is not existing file!');
    if (file.user_cuid !== user_cuid) {
      throw new ForbiddenException('Access Denied');
    }

    return this.prisma.filePreference.findUnique({
      where: { file_cuid },
      select: {
        file_pref_cuid: true,
        text_color_hex: true,
        background_color_hex: true,
        text_spacing: true,
        font_size: true,
        letterSwaps: {
          select: { letter_swap_cuid: true, letter1: true, letter2: true },
        },
      },
    });
  }
}
