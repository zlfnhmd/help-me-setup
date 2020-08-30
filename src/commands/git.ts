import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import { askGitConfigs } from '../inquirer/git';

export default class Git extends Command {
  static description = 'Helper for setting up git configs';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    const { gitEmail, gitUserName } = await askGitConfigs();
    if (gitUserName) {
      execSync(`git config --global user.name ${gitUserName}`);
      this.log(`git username set to: ${gitUserName}`);
    }
    if (gitEmail) {
      execSync(`git config --global user.email ${gitEmail}`);
      this.log(`git email set to: ${gitEmail}`);
    }
  }
}
