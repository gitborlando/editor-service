import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import * as fs from 'fs';
import { nanoid } from 'nanoid';
import { Path } from 'src/utils/fs';
import { Transform } from 'stream';

@Injectable()
export class UploadService {
  private readonly BUFFER_THRESHOLD = 4100;

  async downloadFile(url: string): Promise<StaticFile> {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const staticFile = {} as StaticFile;
    const filePath = Path(`temp/${nanoid(16)}.tmp`);
    const writer = fs.createWriteStream(filePath);

    const bufferList: Buffer[] = [];
    const fileTypeStream = new Transform({
      transform: async (chunk, encoding, callback) => {
        bufferList.push(chunk);
        const buffer = Buffer.concat(bufferList);
        if (buffer.length > this.BUFFER_THRESHOLD) {
          const fileTypeResult = await fileTypeFromBuffer(buffer);
          staticFile.ext = fileTypeResult?.ext || '';
          staticFile.mineType = fileTypeResult?.mime || '';
          //  fs.unlink(filePath, () => {});
        }
        fileTypeStream.push(chunk);
        callback();
      },
    });

    response.data.pipe(fileTypeStream).pipe(writer);

    return new Promise<StaticFile>((resolve, reject) => {
      writer.on('finish', () => resolve(staticFile));
      writer.on('error', reject);
    });
  }
}
