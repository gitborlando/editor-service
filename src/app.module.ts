import { Module } from '@nestjs/common';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UploadModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
