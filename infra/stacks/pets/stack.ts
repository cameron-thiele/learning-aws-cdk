import { App, Stack, StackProps } from 'aws-cdk-lib';

import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';

import { Create } from './constructs/create';
import { Get } from './constructs/get';

interface Props extends StackProps {
  table: ITable;
  api: RestApi;
}

export class PetStack extends Stack {
  constructor(scope: App, id: string, props: Props) {
    super(scope, id, props);

    const { table, api } = props;

    const petsResource = api.root.addResource('pets');

    // Create pet
    new Create(this, 'CreatePet', {
      table,
      petsResource,
    });

    // Get pet
    new Get(this, 'GetPet', {
      table,
      petsResource,
    });
  }
}
