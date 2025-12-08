import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { FilePrefsService } from './file-prefs.service';
import { AuthGuard } from '@nestjs/passport';
import {
  DeleteFilePrefs,
  FilePrefsOut,
  UpdateFilePrefs,
} from '@repo/api/file-prefs';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtUser } from 'src/strategies/jwt.strategy';

@Controller('file-prefs')
export class FilePrefsController {
  constructor(private filePrefsService: FilePrefsService) {}

  @Get('/file/:id')
  @UseGuards(AuthGuard('jwt'))
  findByFile(
    @Param('id') file_cuid: string,
    @CurrentUser() user: JwtUser,
  ): Promise<FilePrefsOut> {
    return this.filePrefsService.findPrefsByFile(file_cuid, user.user_cuid);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateFilePrefs(
    @Body() updateFilePrefsDto: UpdateFilePrefs,
    @CurrentUser() user: JwtUser,
  ): Promise<FilePrefsOut> {
    return this.filePrefsService.updateFilePrefs(
      updateFilePrefsDto,
      user.user_cuid,
    );
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  DeleteFilePrefs(
    @Body() deleteFilePrefsDto: DeleteFilePrefs,
    @CurrentUser() user: JwtUser,
  ): Promise<FilePrefsOut> {
    return this.filePrefsService.deleteFilePrefs(
      deleteFilePrefsDto,
      user.user_cuid,
    );
  }
}
