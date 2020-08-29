import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import { exec } from'child_process';

export default class Git extends Command {
  static description = 'Helper for setting up git configs'

  static flags = {
    help: flags.help({char: 'h'}),
    username: flags.string({description: 'Name which ends up in author field of commit objects'}),
    email: flags.string({description: 'Email which ends up in author field of commit objects'})
  }

  async run() {
    const {flags} = this.parse(Git)

    let username = flags.username;
    let email=flags.email;

    if (!username) {
      let responses: any = await inquirer.prompt([{
        name: 'username',
        message: 'username:',
        type: 'input',
      }])
      username = responses.username
    }
    if (!email) {
      let responses: any = await inquirer.prompt([{
        name: 'email',
        message: 'email:',
        type: 'input',
      }])
      email = responses.email
    }
    if (username) {
      exec(`git config --global user.name ${username}`, (error, stdout, stderr) => {
        if (error) {
            this.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            this.log(`stderr: ${stderr}`);
            return;
        }
        this.log(`git username set to: ${username}`);
    });
    }
    if (email) {exec(`git config --global user.email ${email}`, (error, stdout, stderr) => {
      if (error) {
          this.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          this.log(`stderr: ${stderr}`);
          return;
      }
      this.log(`git email set to: ${email}`);
  });
    }
  }
}
