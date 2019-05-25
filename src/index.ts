import { Toolkit } from 'actions-toolkit';
import Checker from './lib/Checker';

const options = {
  event: 'pull_request',
  secrets: [
    'RELEASE_SSH_ID_RSA',
    'RELEASE_SSH_ID_RSA_PUB',
    'NPM_AUTH_TOKEN',
    'RELEASE_GIT_USER_NAME',
    'RELEASE_GIT_USER_EMAIL',
  ],
};

const task = async (tools: any) => {
  const args: any = tools.arguments;
  tools.log('@@arguments', args);

  const checker = new Checker(tools);
  await checker.run();
};

Toolkit.run(task, options);
