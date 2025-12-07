import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateFile,
  CreateFileWithPrefs,
  FileOut,
  FileOutWithPrefs,
} from '@repo/api/files';

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
            text_color_hex: true,
            background_color_hex: true,
            text_spacing: true,
            font_size: true,
          },
        },
      },
    });

    const { user_cuid: fetched_user_cuid, ...file_data } = file;

    if (!file) throw new NotFoundException('This file does not exist!');
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
  ): Promise<FileOutWithPrefs> {
    const { file_pref, ...createFile } = createFileDto;
    return this.prisma.file.create({
      data: {
        user_cuid,
        ...createFile,
        file_pref: { create: { ...file_pref } },
      },
      select: {
        file_cuid: true,
        file_name: true,
        extracted_text: true,
        file_pref: {
          select: {
            text_color_hex: true,
            background_color_hex: true,
            text_spacing: true,
            font_size: true,
          },
        },
      },
    });
  }
}
