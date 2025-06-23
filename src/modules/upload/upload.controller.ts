import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('upload')
@Controller('upload/static')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('remote-url')
  @ApiOperation({ summary: '上传远程图片' })
  @ApiQuery({ name: 'url', description: '远程图片URL', required: true })
  @ApiResponse({ type: String })
  async uploadByUrl(@Query('url') url: string) {
    return this.uploadService.uploadByUrl(url);
  }

  @Get('get-signed-url')
  @ApiOperation({ summary: '获取已签名上传地址' })
  @ApiQuery({ name: 'ext', description: '文件扩展名', required: true })
  async getSignedUrl(@Query('ext') ext: string) {
    return this.uploadService.getSignedUrl(ext);
  }
}
