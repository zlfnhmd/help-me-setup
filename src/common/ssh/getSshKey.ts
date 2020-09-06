import { join } from 'path';
import { readFile } from 'fs-extra';

import { selectSshFile, shouldUseExistingSsh, askNewSshDetails } from '../../inquirer/ssh';
import { createSshKey } from '../../shellScripts/ssh';

import { getExistingSshKeys, sshDirectoryPath } from './getExistingSshKeys';

export const getSshKey = async () => {
  const existingSshKeys = await getExistingSshKeys();
  let selectedSshKey: string;
  let useExistingSsh = false;
  if (existingSshKeys.length > 0) {
    const res = await shouldUseExistingSsh();
    useExistingSsh = res.useExistingSsh;
  }

  if (useExistingSsh) {
    const res = await selectSshFile(existingSshKeys);
    selectedSshKey = res.selectedSsh;
  } else {
    const { sshKeyName, sshKeyPassphrase } = await askNewSshDetails();
    const keyFile = join(sshDirectoryPath, sshKeyName);
    await createSshKey(keyFile, sshKeyPassphrase);
    selectedSshKey = sshKeyName + '.pub';
  }
  const sshData = await readFile(join(sshDirectoryPath, selectedSshKey), 'utf8');
  return sshData;
};
