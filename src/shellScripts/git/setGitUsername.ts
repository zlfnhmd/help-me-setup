import { execShellScript } from '../execShellScript';

export const setGitUsername = async (username: string) => {
  await execShellScript(`git config --global user.name ${username}`);
};
