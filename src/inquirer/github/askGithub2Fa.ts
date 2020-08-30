import * as inquirer from 'inquirer';

export const askGithub2Fa = (): Promise<{ github2FaCode: string }> => {
  const questions = [
    {
      name: 'github2FaCode',
      type: 'input',
      message: 'Enter your two-factor authentication code:',
      validate: function (value: string): boolean | string {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your two-factor authentication code.';
        }
      },
    },
  ];

  return inquirer.prompt(questions);
};
