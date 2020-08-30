import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import { readFile } from 'fs-extra';
import { join } from 'path';

import { selectSshFile, shouldUseExistingSsh, askNewSshDetails } from '../../inquirer/ssh';
import { getExistingSshKeys, sshDirectoryPath } from '../../common/ssh';
import { getAuthenticatedGhInstance } from '../../common/github';

export default class GithubSsh extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    const github = await getAuthenticatedGhInstance();
    this.log('Authenticated with github successfully');

    const existingSshKeys = await getExistingSshKeys();
    let selectedSsh: string;
    let useExistingSsh = false;
    if (existingSshKeys.length > 0) {
      const res = await shouldUseExistingSsh();
      useExistingSsh = res.useExistingSsh;
    }

    if (useExistingSsh) {
      const res = await selectSshFile(existingSshKeys);
      selectedSsh = res.selectedSsh;
    } else {
      const { sshKeyName, sshKeyPassphrase } = await askNewSshDetails();
      const keyFile = join(sshDirectoryPath, sshKeyName);
      execSync(`ssh-keygen -t rsa -b 4096 -f ${keyFile} -N ${sshKeyPassphrase} -q`);
      selectedSsh = sshKeyName + '.pub';
    }
    const sshData = await readFile(join(sshDirectoryPath, selectedSsh), 'utf8');
    await github.users.createPublicSshKeyForAuthenticated({
      // Todo: Accept user input
      title: 'test',
      key: sshData,
    });
    this.log('Successfully added ssh connection');
  }
}
