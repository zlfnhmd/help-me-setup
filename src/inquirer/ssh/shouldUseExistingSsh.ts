import * as inquirer from 'inquirer';

export const shouldUseExistingSsh = (): Promise<{ useExistingSsh: boolean }> => {
  const questions = [
    {
      name: 'useExistingSsh',
      type: 'confirm',
      message: 'Do you want to use an existing ssh key?',
    },
  ];

  return inquirer.prompt(questions);
};
