import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetSignedUrlRes } from 'src/modules/upload/upload.dto';
import { UploadService } from './upload.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('remote-url')
  @ApiQuery({ name: 'url', description: '远程图片URL', required: true })
  @ApiResponse({ type: String })
  async uploadByUrl(@Query('url') url: string) {
    return this.uploadService.uploadByUrl(url);
  }

  @Get('get-signed-url')
  @ApiQuery({ name: 'ext', description: '文件扩展名', required: true })
  @ApiResponse({ type: GetSignedUrlRes })
  async getSignedUrl(@Query('ext') ext: string) {
    return this.uploadService.getSignedUrl(ext);
  }
}
