import { Command, flags } from '@oclif/command';

import { getSshKey } from '../../common/ssh';
import { getAuthenticatedGhInstance } from '../../common/github';
import { askGithubSshLabel } from '../../inquirer/github';

export default class GithubSsh extends Command {
  static description = 'Helper for setting up github ssh connection';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    const github = await getAuthenticatedGhInstance();
    this.log('Authenticated with github successfully');

    const sshKey = await getSshKey();
    const { githubKeyLabel } = await askGithubSshLabel();

    await github.users.createPublicSshKeyForAuthenticated({
      title: githubKeyLabel,
      key: sshKey,
    });
    this.log('Successfully added ssh connection');
  }
}
