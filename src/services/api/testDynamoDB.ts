import { docClient } from '../../lib/dynamodb';
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('API route hit:', req.method, req.url);
    if (req.method === 'POST') {
    try {
      const putCommand = new PutCommand({
        TableName: process.env.NEXT_PUBLIC_DB_TABLE_NAME,
        Item: req.body
      });
      const result = await docClient.send(putCommand);
      res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}