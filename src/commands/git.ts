import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { execSync } from 'child_process';

export default class Git extends Command {
  static description = 'Helper for setting up git configs';

  static flags = {
    help: flags.help({ char: 'h' }),
    username: flags.string({ description: 'Name which ends up in author field of commit objects' }),
    email: flags.string({ description: 'Email which ends up in author field of commit objects' }),
  };

  async run() {
    const { flags } = this.parse(Git);

    let { username, email } = flags;

    if (!username) {
      const responses: any = await inquirer.prompt([
        {
          name: 'username',
          message: 'Your name:',
          type: 'input',
        },
      ]);
      username = responses.username;
    }
    if (!email) {
      const responses: any = await inquirer.prompt([
        {
          name: 'email',
          message: 'Your email:',
          type: 'input',
        },
      ]);
      email = responses.email;
    }
    if (username) {
      execSync(`git config --global user.name ${username}`);
      this.log(`git username set to: ${username}`);
    }
    if (email) {
      execSync(`git config --global user.email ${email}`);
      this.log(`git email set to: ${email}`);
    }
  }
}
