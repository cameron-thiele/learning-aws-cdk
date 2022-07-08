import { App, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Cors, RestApi } from 'aws-cdk-lib/aws-apigateway';

export class BaseStack extends Stack {
  public readonly table: Table;
  public readonly api: RestApi;

  constructor(scope: App, id: string) {
    super(scope, id);

    const api = new RestApi(this, 'petsApigateway', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    const table = new Table(this, 'petsTable', {
      tableName: 'Pets',
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.RETAIN,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.api = api;
    this.table = table;
  }
}
