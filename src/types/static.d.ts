type MineTypeMap = {
  image:
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/webp'
    | 'image/svg+xml'
    | 'image/tiff'
    | 'image/bmp'
    | 'image/x-icon'
    | 'image/x-ms-bmp';
  video:
    | 'video/mp4'
    | 'video/webm'
    | 'video/ogg'
    | 'video/avi'
    | 'video/mov'
    | 'video/flv'
    | 'video/wmv'
    | 'video/mkv';
  audio: 'audio/mpeg' | 'audio/mp3' | 'audio/ogg';
  text:
    | 'text/plain'
    | 'text/html'
    | 'text/css'
    | 'text/javascript'
    | 'text/xml'
    | 'text/csv'
    | 'text/tab-separated-values'
    | 'text/markdown'
    | 'text/x-python'
    | 'text/x-shellscript'
    | 'text/x-sql'
    | 'text/x-typescript'
    | 'text/x-yaml';
  document:
    | 'application/pdf'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    | 'application/vnd.ms-excel'
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.ms-word'
    | 'application/vnd.ms-excel'
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.ms-word';
  application:
    | 'application/json'
    | 'application/xml'
    | 'application/x-www-form-urlencoded'
    | 'application/x-javascript'
    | 'application/x-php'
    | 'application/x-python'
    | 'application/x-ruby'
    | 'application/x-shellscript'
    | 'application/x-sql'
    | 'application/x-typescript'
    | 'application/x-yaml';
  other: string;
};

type StaticFile = {
  id: string;
  name: string;
  ext: string;
  mineType: MineTypeMap[keyof MineTypeMap];
  size: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
