import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../../../config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');

  if (!userId) {
    return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
  }

  try {
    const { Item: currentUser } = (await db.send(
      new GetCommand({
        TableName: process.env.DB_TABLE_NAME,
        Key: {
          pk: `USER#${userId}`,
          sk: `USER#${userId}`,
        },
      })
    ));

    return NextResponse.json(currentUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}