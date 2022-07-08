import { App } from 'aws-cdk-lib';
import { BaseStack } from './stacks/base/stack';
import { PetStack } from './stacks/pets/stack';

const appName = 'testing';

const app = new App();
const baseStack = new BaseStack(app, appName);

const props = {
  table: baseStack.table,
  api: baseStack.api,
};

new PetStack(app, `${appName}Pets`, props);
