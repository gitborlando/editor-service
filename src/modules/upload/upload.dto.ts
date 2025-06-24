import { ApiProperty } from '@nestjs/swagger';

export class GetSignedUrlRes {
  @ApiProperty({ description: '已签名oss上传地址' })
  signedUploadUrl: string;

  @ApiProperty({ description: 'oss文件地址' })
  url: string;
}
