import { execShellScript } from '../execShellScript';

export const createSshKey = async (keyFilePath: string, keyPassphrase: string) => {
  await execShellScript(`ssh-keygen -t rsa -b 4096 -f ${keyFilePath} -N ${keyPassphrase} -q`);
};
