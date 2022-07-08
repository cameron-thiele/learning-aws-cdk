import { DateTime } from 'luxon';
import KSUID from 'ksuid';

import { Event, LambdaResponse, headers, Pet } from '../../common/types';
import { ddb } from '../../common/Dynamo';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const handler = async (event: Event): Promise<LambdaResponse> => {
  console.log('creating pet with event:', event);
  if (!event.body) {
    return {
      statusCode: 400,
      headers,
      body: 'No pet data provided',
    };
  }

  // Parse the body
  const { name, color } = JSON.parse(event.body);

  if (!name || !color) {
    return {
      statusCode: 400,
      body: "Either name or color wasn't provided",
      headers,
    };
  }

  // Create pet
  console.log('creating pet with params:', { color, name });
  const id = await createPet({ color, name });

  if (id === null) {
    return {
      statusCode: 500,
      body: 'Internal error creating pet',
      headers,
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      id,
      message: 'Successfully created pet',
    }),
    headers,
  };
};

const createPet = async ({ name, color }: Pet): Promise<string | null> => {
  try {
    const id = KSUID.randomSync().string;
    const item = {
      pk: name,
      sk: color,
      id,
      created: DateTime.now().toUTC().toISO(),
    };
    const params: DocumentClient.PutItemInput = {
      TableName: 'Pets',
      Item: item,
    };

    await ddb.put(params).promise();
    console.log('successfully created pet with id of:', id);
    return id;
  } catch (error) {
    console.log('error creating pet: ', error);
    return null;
  }
};
