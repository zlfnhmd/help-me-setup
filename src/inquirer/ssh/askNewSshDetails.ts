import * as inquirer from 'inquirer';

export const askNewSshDetails = (): Promise<{ sshKeyName: string; sshKeyPassphrase: string }> => {
  const questions = [
    {
      name: 'sshKeyName',
      type: 'input',
      message: 'Enter file name in which to save the key:',
      validate: function (value: string): boolean | string {
        if (!value) {
          return 'Please enter file name in which to save the key.';
        } else if (value == '') {
          // TODO: check if key already exists
          return 'SSH Key with that name already exists. Please enter a new name.';
        }
        return true;
      },
    },
    {
      name: 'sshKeyPassphrase',
      type: 'password',
      message: 'Enter passphrase (empty for no passphrase):',
    },
  ];

  return inquirer.prompt(questions);
};
