#!/usr/bin/env node

import { Toolkit } from 'actions-toolkit';
import Checker from '../lib/Checker';

const options = {
  event: 'pull_request',
  secrets: [
    'NPM_TOKEN',
    'GITHUB_TOKEN',
  ]
};

const task = async (tools: any) => {
  const args: any = tools.arguments;
  tools.log('@@arguments', args);

  const checker = new Checker(tools);
  await checker.run();
};

Toolkit.run(task, options);
