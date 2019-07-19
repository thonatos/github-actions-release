#!/usr/bin/env node

import { Toolkit } from 'actions-toolkit';
import Checker from '../lib/Checker';
import Releaser from '../lib/Releaser';

const options = {
  event: 'pull_request',
  secrets: [
    'NPM_TOKEN',
    'GITHUB_TOKEN',
  ],
};

const task = async (tools: any) => {
  const args: any = tools.arguments;
  tools.log('@@arguments', args);

  const { _: command } = args;

  switch (command) {
    case 'check':
      const checker = new Checker();
      await checker.run(tools);
      break;

    case 'release':
      const releaser = new Releaser();
      await releaser.run(tools);
      break;

    default:
      break;
  }

};

Toolkit.run(task, options);
