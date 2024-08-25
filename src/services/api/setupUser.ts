import { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, email, name } = req.body;

  if (!id || !email || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: process.env.DB_TABLE_NAME,
        Item: {
          pk: `USER#${id}`,
          sk: `USER#${id}`,
          id,
          email,
          name,
          createdAt: new Date().toISOString(),
        },
      })
    );

    res.status(200).json({ message: 'User setup successful' });
  } catch (error) {
    console.error('Error setting up user in DynamoDB:', error);
    res.status(500).json({ message: 'Error setting up user' });
  }
}