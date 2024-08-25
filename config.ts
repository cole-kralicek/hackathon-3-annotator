import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import * as dotenv from 'dotenv'; 
dotenv.config(); 

const awsCredentials = {
  accessKeyId: process.env.AWS_CCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

const dynamoConfig = {
  region: process.env.AWS_REGION,
  credentials: awsCredentials,
} as {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  region: string;
};

const db = DynamoDBDocument.from(new DynamoDB(dynamoConfig), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,
  },
});

export { db };