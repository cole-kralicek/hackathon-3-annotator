import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import * as dotenv from 'dotenv'; 
dotenv.config(); 

const client = new DynamoDBClient({
  region: process.env.AWS_ACCOUNT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_ACCOUNT_SECRET_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function storeDisplayedComments(id: string, displayedComments: DisplayedComment[]) {
  try {
    const putCommand = new PutCommand({
      TableName: process.env.DB_TABLE_NAME,
      Item: {
        pk: `USER#${id}`,
        sk: `COMMENTS#${id}`,
        displayedComments: displayedComments, 
        createdAt: new Date().toISOString(),
      },
    });

    const result = await docClient.send(putCommand);
    console.log('PutCommand result:', result);
    return result;
  } catch (error) {
    console.error('Error storing displayed comments in DynamoDB:', error);
    throw new Error('Failed to store displayed comments in DynamoDB');
  }
}