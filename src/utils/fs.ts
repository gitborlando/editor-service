import * as fs from 'fs';
import * as path from 'path';

export function currentDirPath(filePath: string) {
  const pathArr = filePath.split('/').filter(Boolean);
  return path.join(process.cwd(), ...pathArr);
}

export function makeSureDirExists(dirPath: string, createWhenNotExists = true) {
  if (!fs.existsSync(dirPath)) {
    if (createWhenNotExists) {
      fs.mkdirSync(dirPath, { recursive: true });
    } else {
      throw new Error(`Directory ${dirPath} does not exist`);
    }
  }
}
