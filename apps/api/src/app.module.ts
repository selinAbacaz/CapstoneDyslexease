import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { SwapsModule } from './swaps/swaps.module';
import { FilePrefsModule } from './file-prefs/file-prefs.module';

@Module({
  imports: [UsersModule, AuthModule, FilesModule, SwapsModule, FilePrefsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
