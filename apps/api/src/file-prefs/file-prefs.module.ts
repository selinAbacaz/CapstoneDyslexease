import { Module } from '@nestjs/common';
import { FilePrefsController } from './file-prefs.controller';
import { FilePrefsService } from './file-prefs.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FilePrefsController],
  providers: [FilePrefsService, PrismaService],
})
export class FilePrefsModule {}
