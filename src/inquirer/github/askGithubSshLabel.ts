import * as inquirer from 'inquirer';

export const askGithubSshLabel = (): Promise<{ githubKeyLabel: string }> => {
  const questions = [
    {
      name: 'githubKeyLabel',
      type: 'input',
      message: 'Label for new key in github:',
      validate: function (value: string): boolean | string {
        if (!value) {
          return 'Please enter your two-factor authentication code.';
        } else if (false) {
          // TODO: check if label already exists in github
          return 'A key with this name already exists if your github account. Please enter a new label';
        }
        return true;
      },
    },
  ];

  return inquirer.prompt(questions);
};
