import { Command, flags } from '@oclif/command';

import { askGitConfigs } from '../inquirer/git';
import { setGitUsername, setGitEmail } from '../shellScripts/git';

export default class Git extends Command {
  static description = 'Helper for setting up git configs';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    const { gitEmail, gitUserName } = await askGitConfigs();
    if (gitUserName) {
      await setGitUsername(gitUserName);
      this.log(`git username set to: ${gitUserName}`);
    }
    if (gitEmail) {
      await setGitEmail(gitEmail);
      this.log(`git email set to: ${gitEmail}`);
    }
  }
}
