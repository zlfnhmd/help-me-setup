import * as inquirer from 'inquirer';
import { getExistingSshKeys } from '../../utils/ssh/getExistingSshKeys';

export const selectSshFile = (sshList?: string[]): Promise<{ selectedSsh: string }> => {
  const questions = [
    {
      name: 'selectedSsh',
      type: 'list',
      choices:
        sshList ??
        async function () {
          const list = await getExistingSshKeys();
          return list;
        },
      message: 'Select an existing ssh key',
    },
  ];

  return inquirer.prompt(questions);
};
