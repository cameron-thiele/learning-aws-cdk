import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// create document client used for doing DB queries
export const ddb = new DocumentClient();
