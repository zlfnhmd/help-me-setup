// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../../package.json');

import { Octokit } from '@octokit/rest';
import Configstore from 'configstore';

import { createNewGithubToken } from './createNewGithubToken';

const conf = new Configstore(pkg.name);

export const getAuthenticatedGhInstance = async () => {
  let authToken = conf.get('github.token');
  if (!authToken) {
    authToken = await createNewGithubToken();
    conf.set('github.token', authToken);
  }
  return new Octokit({
    auth: authToken,
  });
};
