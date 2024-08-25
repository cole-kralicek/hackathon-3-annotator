import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_ACCOUNT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_ACCOUNT_SECRET_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function storeTranscript(userId: string, transcript: string[]) {
  try {
    const putCommand = new PutCommand({
      TableName: process.env.DB_TABLE_NAME,
      Item: {
        pk: `USER#${userId}`, 
        sk: `TRANSCRIPT#${userId}`, 
        transcript: transcript, 
        userId: userId, 
        createdAt: new Date().toISOString(),
      },
    });

    const result = await docClient.send(putCommand);
    console.log('PutCommand result:', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error name:', error.name);
      console.log('Error message:', error.message);
      console.log('Error stack:', error.stack);
      
      throw new Error('Failed to store transcript in DynamoDB. Please check the server logs for more details.');
    } else {
      console.error('Unknown error:', error);
      throw new Error('Failed to store transcript in DynamoDB due to an unknown error.');
    }
  }
}
