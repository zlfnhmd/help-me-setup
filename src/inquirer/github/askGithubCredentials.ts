import * as inquirer from 'inquirer';

export const askGithubCredentials = (): Promise<{ githubUsername: string; githubPassword: string }> => {
  const questions = [
    {
      name: 'githubUsername',
      type: 'input',
      message: 'Enter your GitHub username or e-mail address:',
      validate: function (value: string): boolean | string {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address.';
        }
      },
    },
    {
      name: 'githubPassword',
      type: 'password',
      message: 'Enter your password:',
      validate: function (value: string): boolean | string {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password.';
        }
      },
    },
  ];

  return inquirer.prompt(questions);
};
