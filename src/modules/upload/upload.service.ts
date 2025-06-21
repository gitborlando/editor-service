import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import { nanoid } from 'nanoid';
import { AuthService } from 'src/modules/auth/auth.service';
import { SuspendSwitch } from 'src/utils/suspend';
import Stream, { PassThrough } from 'stream';

@Injectable()
export class UploadService {
  private readonly BUFFER_THRESHOLD = 4100;

  constructor(private readonly authService: AuthService) {}

  async uploadOSS(staticFile: StaticFile, passThrough: PassThrough) {
    const ossAuth = await this.authService.getOSSAuth();
    const s3 = new S3Client({
      region: 'automatic',
      endpoint: ossAuth.Buckets[0].s3Endpoint,
      credentials: ossAuth.Credentials,
    });
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: ossAuth.Buckets[0].s3Bucket,
        Key: this.genOSSKey(staticFile.ext),
        Body: passThrough,
        ContentType: staticFile.mineType,
      },
    });
    const res = await upload.done();
    staticFile.createdAt = new Date().getTime().toString();
    staticFile.url = `https://s-gz-13280-static.oss.dogecdn.com/${res.Key}`;
    return staticFile;
  }

  private genOSSKey(ext: string) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}/${nanoid(16)}.${ext}`;
  }

  async downloadFile(url: string): Promise<StaticFile> {
    const downloadRes = (await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    })) as AxiosResponse<Stream>;

    const staticFile = {} as StaticFile;
    const suspendFileTypeDetected = new SuspendSwitch();

    const bufferList: Buffer[] = [];
    const fileTypeStream = new PassThrough();
    fileTypeStream._transform = async (chunk, encoding, callback) => {
      bufferList.push(chunk);
      const buffer = Buffer.concat(bufferList);
      if (!staticFile.ext && buffer.length > this.BUFFER_THRESHOLD) {
        const fileTypeResult = await fileTypeFromBuffer(buffer);
        console.log('fileTypeResult: ', fileTypeResult);
        staticFile.ext = fileTypeResult?.ext || '';
        staticFile.mineType = fileTypeResult?.mime || '';
        suspendFileTypeDetected.endSuspend();
      }
      callback(null, chunk);
    };

    const uploadStream = new PassThrough();

    downloadRes.data.pipe(fileTypeStream).pipe(uploadStream);

    await suspendFileTypeDetected.fullFill();
    await this.uploadOSS(staticFile, uploadStream);

    return staticFile;
  }
}
