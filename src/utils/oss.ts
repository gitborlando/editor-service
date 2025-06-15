import OSS from 'ali-oss';

const client = new OSS({
  region: 'your-region',
  accessKeyId: 'your-access-key-id',
  accessKeySecret: 'your-access-key-secret',
  bucket: 'your-bucket',
});

export async function uploadToOSS(
  filePath: string,
  fileName: string,
): Promise<string> {
  try {
    const result = await client.put(fileName, filePath);
    return result.url;
  } catch (error) {
    console.error('上传到 OSS 失败:', error);
    throw error;
  }
}
