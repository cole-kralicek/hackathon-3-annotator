import { NextResponse } from 'next/server';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

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

export async function POST(req: Request) {
  const { id, email, name } = await req.json();

  if (!id || !email || !name) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
  
  try {
    // Check if user exists in DynamoDB
    const getResult = await docClient.send(
      new GetCommand({
        TableName: process.env.DB_TABLE_NAME,
        Key: {
          pk: `USER#${id}`,
          sk: `USER#${id}`,
        },
      })
    );
    console.log(getResult);

    if (getResult.Item) {
        return NextResponse.json({ message: 'User already exists in the database' });
    }

    // If user doesn't exist, create them
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

    return NextResponse.json({ message: 'User has been set up in the database' });
  } catch (error) {
    console.error('Error checking/setting up user in DynamoDB:', error);
    return NextResponse.json({ message: 'Error checking/setting up user' }, { status: 500 });
  }
}