import { join } from 'path';
import { readdir } from 'fs-extra';
import { homedir } from 'os';

export const sshDirectoryPath = join(homedir(), '.ssh');

export const getExistingSshKeys = async () => {
  const list: string[] = await readdir(sshDirectoryPath);
  return list.filter((filename) => filename.endsWith('.pub'));
};
