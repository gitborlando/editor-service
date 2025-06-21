import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

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

export function Path(relativePath: string, importMetaUrl?: string) {
  const pathList = relativePath.split('/').filter(Boolean);
  const filePath = path.join(
    importMetaUrl ? getCurrentDir(importMetaUrl) : process.cwd(),
    ...pathList,
  );
  makeSureDirExists(path.dirname(filePath));
  console.log('filePath: ', filePath);
  return filePath;
}

export function getCurrentPath(importMetaUrl: string) {
  return fileURLToPath(importMetaUrl);
}

export function getCurrentDir(importMetaUrl: string) {
  return path.dirname(getCurrentPath(importMetaUrl));
}
