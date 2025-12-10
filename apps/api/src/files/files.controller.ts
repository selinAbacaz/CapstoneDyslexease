import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtUser } from 'src/strategies/jwt.strategy';
import {
  CreateFile,
  CreateFileWithPrefs,
  DeleteFile,
  FileOut,
  FileOutWithPrefs,
  UpdateFileAndPrefs,
} from '@repo/api/files';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@CurrentUser() user: JwtUser): Promise<FileOut[]> {
    return this.filesService.findAllFiles(user.user_cuid);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(
    @Param('id') file_cuid: string,
    @CurrentUser() user: JwtUser,
  ): Promise<FileOut> {
    return this.filesService.findFile(file_cuid, user.user_cuid);
  }

  @Get(':id/prefs')
  @UseGuards(AuthGuard('jwt'))
  findOneWithPrefs(
    @Param('id') file_cuid: string,
    @CurrentUser() user: JwtUser,
  ): Promise<FileOutWithPrefs> {
    return this.filesService.findFileWthPrefs(file_cuid, user.user_cuid);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createFileDto: CreateFile,
    @CurrentUser() user: JwtUser,
  ): Promise<FileOut> {
    return this.filesService.createFile(createFileDto, user.user_cuid);
  }

  @Post('/prefs')
  @UseGuards(AuthGuard('jwt'))
  createWithPrefs(
    @Body() createFileDto: CreateFileWithPrefs,
    @CurrentUser() user: JwtUser,
  ): Promise<FileOut> {
    return this.filesService.createFileWithPrefs(createFileDto, user.user_cuid);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateWithPrefs(
    @Body() updateFileDto: UpdateFileAndPrefs,
    @CurrentUser() user: JwtUser,
  ): Promise<FileOutWithPrefs> {
    return this.filesService.updateFileAndPrefs(updateFileDto, user.user_cuid);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  delete(
    @Body() deleteFileDto: DeleteFile,
    @CurrentUser() user: JwtUser,
  ): Promise<FileOutWithPrefs> {
    return this.filesService.deleteFile(deleteFileDto, user.user_cuid);
  }
}
