import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateFilePrefs,
  DeleteFilePrefs,
  FilePrefsOut,
  UpdateFilePrefs,
} from '@repo/api/file-prefs';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilePrefsService {
  constructor(private prisma: PrismaService) {}

  async findPrefsByFile(
    file_cuid: string,
    user_cuid: string,
  ): Promise<FilePrefsOut> {
    const filePrefs = await this.prisma.filePreference.findUnique({
      where: { file_cuid, file: { user_cuid } },
      select: {
        file_pref_cuid: true,
        font: true,
        text_color_hex: true,
        background_color_hex: true,
        text_spacing: true,
        font_size: true,
        letterSwaps: {
          select: { letter_swap_cuid: true, letter1: true, letter2: true },
        },
      },
    });

    if (!filePrefs) {
      const file = await this.prisma.file.findUnique({
        where: { file_cuid },
        select: { user_cuid: true },
      });

      if (!file) throw new NotFoundException('There is not existing file!');
      if (file.user_cuid !== user_cuid) {
        throw new ForbiddenException('Access Denied');
      }
    }

    return filePrefs;
  }

  async updateFilePrefs(
    updateFilePrefsDto: UpdateFilePrefs,
    user_cuid: string,
  ): Promise<FilePrefsOut> {
    const { file_pref_cuid, letterSwaps, ...updatedPrefs } = updateFilePrefsDto;
    try {
      const updates = await this.prisma.filePreference.update({
        where: { file_pref_cuid, file: { user_cuid } },
        data: updatedPrefs,
        select: {
          file_pref_cuid: true,
          font: true,
          text_color_hex: true,
          background_color_hex: true,
          text_spacing: true,
          font_size: true,
        },
      });

      const updatedSwaps = await Promise.all(
        letterSwaps.map(async ({ letter_swap_cuid, ...updateSwaps }) =>
          this.prisma.letterSwap.update({
            where: { letter_swap_cuid, file_pref: { file: { user_cuid } } },
            data: updateSwaps,
            select: { letter_swap_cuid: true, letter1: true, letter2: true },
          }),
        ),
      );

      return { ...updates, letterSwaps: updatedSwaps };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const existingPref = await this.prisma.filePreference.findUnique({
          where: { file_pref_cuid },
        });

        if (!existingPref) {
          throw new NotFoundException('This letter swap does not exist');
        } else {
          throw new ForbiddenException('Access Denied');
        }
      }
    }
  }

  async deleteFilePrefs(
    deleteFilePrefsDto: DeleteFilePrefs,
    user_cuid: string,
  ): Promise<FilePrefsOut> {
    const { file_pref_cuid } = deleteFilePrefsDto;
    try {
      return this.prisma.filePreference.delete({
        where: { file_pref_cuid, file: { user_cuid } },
        select: {
          file_pref_cuid: true,
          font: true,
          text_color_hex: true,
          background_color_hex: true,
          text_spacing: true,
          font_size: true,
          letterSwaps: {
            select: { letter_swap_cuid: true, letter1: true, letter2: true },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const existingPref = await this.prisma.filePreference.findUnique({
          where: { file_pref_cuid },
        });

        if (!existingPref) {
          throw new NotFoundException('This letter swap does not exist');
        } else {
          throw new ForbiddenException('Access Denied');
        }
      }
    }
  }
}
