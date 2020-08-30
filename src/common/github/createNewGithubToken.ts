import { createBasicAuth } from '@octokit/auth-basic';

import { askGithubCredentials, askGithub2Fa } from '../../inquirer/github';

export const createNewGithubToken = async (): Promise<string> => {
  const { githubUsername, githubPassword } = await askGithubCredentials();
  const auth: any = createBasicAuth({
    username: githubUsername,
    password: githubPassword,
    async on2Fa() {
      const { github2FaCode } = await askGithub2Fa();
      return github2FaCode;
    },
    token: {
      scopes: ['write:public_key'],
      note: 'help-me-setup',
    },
  });

  try {
    const { token } = await auth();
    if (token) {
      return token;
    } else {
      throw new Error('GitHub token was not found in the response');
    }
  } catch (er) {
    throw new Error('Error while authenticating with github');
  }
};
