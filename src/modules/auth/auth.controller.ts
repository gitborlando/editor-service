import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('oss')
  @ApiOperation({ summary: '获取OSS认证信息' })
  async getOSSAuth() {
    return this.authService.getOSSAuth();
  }
}
