import { getAuthenticatedGhInstance } from './getAuthenticatedGhInstance';

export const listExistingSshKeyNames = async (): Promise<any> => {
  const github = await getAuthenticatedGhInstance();
  const sshList = await github.users.listPublicSshKeysForAuthenticated();
  return sshList;
};
