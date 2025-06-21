import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  private ossAccessKey = 'fd77e5db02f9e246';
  private ossSecretKey = '634c3c5b6789adcaf0ab8b19c5109755';

  async getOSSAuth() {
    const body = {
      channel: 'OSS_UPLOAD',
      scopes: ['static:*'],
    };

    const sign = createHmac('sha1', this.ossSecretKey)
      .update(
        Buffer.from('/auth/tmp_token.json\n' + JSON.stringify(body), 'utf8'),
      )
      .digest('hex');
    const authorization = 'TOKEN ' + this.ossAccessKey + ':' + sign;

    const res = await axios.post(
      'https://api.dogecloud.com/auth/tmp_token.json',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
      },
    );

    return res.data.data as OSSAuth;
  }
}
