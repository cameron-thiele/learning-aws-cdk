import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Event, LambdaResponse, headers, Pet } from '../../common/types';
import { ddb } from '../../common/Dynamo';

export const handler = async (event: Event): Promise<LambdaResponse> => {
  console.log('getting pet based on event', event);
  const name = event.queryStringParameters?.name;
  const color = event.queryStringParameters?.color;

  if (!name || !color) {
    return {
      statusCode: 400,
      body: "Either name or color wasn't provided",
      headers,
    };
  }

  // get pet
  console.log('getting pet based on parmas', { color, name });
  const pet = await getPet({ color, name });

  console.log('retrieved pet object', pet);
  if (pet) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        pet,
        message: 'Successfully created pet',
      }),
      headers,
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal error creating pet',
      }),
      headers,
    };
  }
};

const getPet = async ({ name, color }: Pet): Promise<Pet | null> => {
  try {
    const params: DocumentClient.GetItemInput = {
      TableName: 'Pets',
      Key: {
        pk: name,
        sk: color,
      },
    };
    const item = await ddb.get(params).promise();

    const pet = item.Item as Pet;

    if (pet) {
      return pet;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error creating pet: ', error);
    return null;
  }
};
