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

export class Get extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { petsResource, table } = props;

    const getPetLambda = new NodejsFunction(this, 'getPetLambda', {
      functionName: 'GetPetLambda',
      entry: resolve(APP_ROOT, 'src/pets/GetPet.ts'),
      memorySize: 512,
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler',
      tracing: Tracing.ACTIVE,
    });
    table.grantReadData(getPetLambda);

    // endpoint will be GET /nodejs/pets
    petsResource.addMethod('GET', new LambdaIntegration(getPetLambda, { proxy: true }));
  }
}
