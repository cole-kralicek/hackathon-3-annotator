import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { db } from "../../../config";
import { GetCurrentUser } from "../../../utils/db/get-current-user";

export async function POST() {
  const user = await GetCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  await db.send(
    new UpdateCommand({
      TableName: process.env.DB_TABLE_NAME,
      Key: {
        pk: user.pk,
        sk: user.sk,
      },
      UpdateExpression: "",
      ExpressionAttributeValues: {
        ":inc": 1,
      },
    })
  );

  return NextResponse.json({ status: 204 });
}

export async function GET() {
  const user = await GetCurrentUser();

  // Get relevant details for the user
  return NextResponse.json({});
}