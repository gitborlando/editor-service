import * as fs from 'fs';
import * as path from 'path';

export function currentDirPath(filePath: string) {
  const pathArr = filePath.split('/').filter(Boolean);
  return path.join(process.cwd(), ...pathArr);
}

export function relativeSrcPath(filePath: string) {
  return path.join(process.cwd(), filePath);
}

export function makeSureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function Path(relativePath: string) {
  const pathList = relativePath.split('/').filter(Boolean);
  const filePath = path.join(process.cwd(), ...pathList);
  makeSureDirExists(path.dirname(filePath));
  return filePath;
}
