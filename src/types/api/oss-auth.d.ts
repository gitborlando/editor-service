interface OSSAuth {
  Credentials: Credentials;
  ExpiredAt: number;
  Buckets: Bucket[];
}

interface Bucket {
  name: string;
  s3Bucket: string;
  s3Endpoint: string;
  s3EndpointHost: string;
}

interface Credentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}
