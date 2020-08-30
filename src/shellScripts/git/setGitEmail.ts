import { execShellScript } from '../execShellScript';

export const setGitEmail = async (email: string) => {
  await execShellScript(`git config --global user.name ${email}`);
};
