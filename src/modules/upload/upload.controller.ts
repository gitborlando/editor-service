import { Controller, Get, Query } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload/static')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('remote-url')
  async uploadByUrl(@Query('url') url: string) {
    return this.uploadService.uploadByUrl(url);
  }

  @Get('get-signed-url')
  async getSignedUrl(@Query('ext') ext: string) {
    return this.uploadService.getSignedUrl(ext);
  }
}
