import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateFile,
  CreateFileWithPrefs,
  DeleteFile,
  FileOut,
  FileOutWithPrefs,
  UpdateFileAndPrefs,
} from '@repo/api/files';
import { Prisma } from '@repo/database';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  findAllFiles(user_cuid: string): Promise<FileOut[]> {
    return this.prisma.file.findMany({
      where: { user_cuid },
      select: { file_cuid: true, file_name: true, extracted_text: true },
    });
  }

  async findFile(file_cuid: string, user_cuid: string): Promise<FileOut> {
    const file = await this.prisma.file.findUnique({
      where: { file_cuid },
      select: {
        file_cuid: true,
        user_cuid: true,
        file_name: true,
        extracted_text: true,
      },
    });

    const { user_cuid: fetched_user_cuid, ...file_data } = file;

    if (!file) throw new NotFoundException('This file does not exist!');
    if (fetched_user_cuid !== user_cuid) {
      throw new ForbiddenException('Access Denied!');
    }

    return file_data;
  }

  async findFileWthPrefs(
    file_cuid: string,
    user_cuid: string,
  ): Promise<FileOutWithPrefs> {
    const file = await this.prisma.file.findUnique({
      where: { file_cuid },
      select: {
        file_cuid: true,
        user_cuid: true,
        file_name: true,
        extracted_text: true,
        file_pref: {
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
        },
      },
    });

    if (!file) throw new NotFoundException('This file does not exist!');

    const { user_cuid: fetched_user_cuid, ...file_data } = file;
    if (fetched_user_cuid !== user_cuid) {
      throw new ForbiddenException('Access Denied!');
    }

    return file_data;
  }

  createFile(createFileDto: CreateFile, user_cuid: string): Promise<FileOut> {
    return this.prisma.file.create({
      data: { user_cuid, ...createFileDto },
      select: { file_cuid: true, file_name: true, extracted_text: true },
    });
  }

  createFileWithPrefs(
    createFileDto: CreateFileWithPrefs,
    user_cuid: string,
  ): Promise<FileOut> {
    const {
      file_pref: { letterSwaps, ...pref },
      ...createFile
    } = createFileDto;
    return this.prisma.file.create({
      data: {
        user_cuid,
        ...createFile,
        file_pref: {
          create: {
            ...pref,
            letterSwaps: {
              create: letterSwaps,
            },
          },
        },
      },
      select: {
        file_cuid: true,
        file_name: true,
        extracted_text: true,
      },
    });
  }

  async updateFileAndPrefs(
    updateFileDto: UpdateFileAndPrefs,
    user_cuid: string,
  ): Promise<FileOutWithPrefs> {
    const {
      file_cuid,
      file_pref: { letterSwaps, ...prefs },
      ...updatedFile
    } = updateFileDto;

    try {
      const updates = await this.prisma.file.update({
        where: { file_cuid, user_cuid },
        data: {
          ...updatedFile,
          file_pref: {
            update: {
              data: prefs,
            },
          },
        },
        select: {
          file_cuid: true,
          file_name: true,
          extracted_text: true,
          file_pref: {
            select: {
              file_pref_cuid: true,
              font: true,
              text_color_hex: true,
              background_color_hex: true,
              text_spacing: true,
              font_size: true,
            },
          },
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

      return {
        ...updates,
        file_pref: { ...updates.file_pref, letterSwaps: updatedSwaps },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const existingFile = await this.prisma.file.findUnique({
          where: { file_cuid },
        });

        if (!existingFile) {
          throw new NotFoundException('This file does not exist');
        } else {
          throw new ForbiddenException('Access Denied');
        }
      }
    }
  }

  async deleteFile(
    deleteFileDto: DeleteFile,
    user_cuid: string,
  ): Promise<FileOutWithPrefs> {
    const { file_cuid } = deleteFileDto;
    try {
      const deletedFile = await this.prisma.file.delete({
        where: { file_cuid, user_cuid },
        select: {
          file_cuid: true,
          user_cuid: true,
          file_name: true,
          extracted_text: true,
          file_pref: {
            select: {
              file_pref_cuid: true,
              font: true,
              text_color_hex: true,
              background_color_hex: true,
              text_spacing: true,
              font_size: true,
              letterSwaps: {
                select: {
                  letter_swap_cuid: true,
                  letter1: true,
                  letter2: true,
                },
              },
            },
          },
        },
      });

      await this.prisma.user.update({
        where: { user_cuid },
        data: { selected_file_cuid: null },
      });

      return deletedFile;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const existingFile = await this.prisma.file.findUnique({
          where: { file_cuid },
        });

        if (!existingFile) {
          throw new NotFoundException('This letter swap does not exist');
        } else {
          throw new ForbiddenException('Access Denied');
        }
      }
    }
  }
}
