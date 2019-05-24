import { Toolkit } from 'actions-toolkit';
import Checker from './lib/Checker';

const options = {
  event: 'pull_request',
};

const task = async (tools) => {
  const args: any = tools.arguments;
  tools.log('@@arguments', args);

  const checker = new Checker(tools);
  await checker.run();
};

Toolkit.run(task, options);
