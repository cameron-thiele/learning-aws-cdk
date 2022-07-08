export type Headers = {
  'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT';
  'Access-Control-Allow-Origin': '*';
};
export const headers: Headers = {
  'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
  'Access-Control-Allow-Origin': '*',
};

export type LambdaResponse = {
  statusCode: number;
  body: string;
  headers: Headers;
};
export type Event = {
  queryStringParameters?: {
    name?: string;
    color?: string;
  };
  body?: string;
};

export interface Pet {
  name?: string;
  color?: string;
  id?: string;
  created?: string;
}
