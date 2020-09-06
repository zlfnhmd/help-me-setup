import * as inquirer from 'inquirer';
import { listExistingSshKeyNames } from '../../common/github/listExistingSshKeyNames';

export const askGithubSshLabel = (): Promise<{ githubKeyLabel: string }> => {
  const questions = [
    {
      name: 'githubKeyLabel',
      type: 'input',
      message: 'Label for new key in github:',
      validate: async function (value: string): Promise<boolean | string> {
        if (!value) {
          return 'Please Enter a label for the new key in github.';
        }
        const existingKeys = await listExistingSshKeyNames();
        const keyLabelExists = existingKeys.data.filter((key: any) => key.title == value);
        if (keyLabelExists) {
          return 'A key with this name already exists in your github account. Please enter a new label.';
        }
        return true;
      },
    },
  ];

  return inquirer.prompt(questions);
};
