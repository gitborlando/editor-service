import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('url')
  async downloadFile(@Body() body: { url: string }) {
    return this.uploadService.downloadFile(body.url);
  }
}
