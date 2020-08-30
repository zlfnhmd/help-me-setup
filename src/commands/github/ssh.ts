import { Command, flags } from '@oclif/command';
import { readFile } from 'fs-extra';
import { join } from 'path';

import { selectSshFile, shouldUseExistingSsh, askNewSshDetails } from 'src/inquirer/ssh';
import { getExistingSshKeys, sshDirectoryPath } from 'src/common/ssh';
import { getAuthenticatedGhInstance } from 'src/common/github';
import { createSshKey } from 'src/shellScripts/ssh';

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
      await createSshKey(keyFile, sshKeyPassphrase);
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
