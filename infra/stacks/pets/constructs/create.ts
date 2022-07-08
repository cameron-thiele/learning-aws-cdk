import { resolve } from 'path';
import { Construct } from 'constructs';

import { LambdaIntegration, Resource } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

import { APP_ROOT } from '../../../common/utils';

interface Props {
  table: ITable;
  petsResource: Resource;
}

export class Create extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { petsResource, table } = props;

    const createPetLambda = new NodejsFunction(this, 'createPetLambda', {
      functionName: 'CreatePetLambda',
      entry: resolve(APP_ROOT, 'src/pets/CreatePet.ts'),
      memorySize: 512,
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler',
      tracing: Tracing.ACTIVE,
    });
    table.grantReadWriteData(createPetLambda);

    // endpoint will be POST /nodejs/pets
    petsResource.addMethod('POST', new LambdaIntegration(createPetLambda, { proxy: true }));
  }
}
