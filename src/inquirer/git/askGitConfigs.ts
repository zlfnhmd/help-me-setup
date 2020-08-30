import * as inquirer from 'inquirer';

export const askGitConfigs = (): Promise<{ gitEmail: string; gitUserName: string }> => {
  const questions = [
    {
      name: 'gitUserName',
      type: 'input',
      message: 'Enter your name:',
    },
    {
      name: 'gitEmail',
      type: 'input',
      message: 'Enter your email:',
    },
  ];

  return inquirer.prompt(questions);
};
