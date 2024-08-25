import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
});

export async function POST(req: NextRequest) {
    const { transcript_id, text, tag, startIdx, endIdx, files } =
        await req.json();

    if (!transcript_id || !text) {
        return NextResponse.json(
            { error: "Transcript ID and text are required" },
            { status: 400 }
        );
    }

    const comment_id = uuidv4(); // Generate a unique ID for the comment

    try {
        const command = new PutItemCommand({
            TableName: "Comments",
            Item: {
                comment_id: { S: comment_id },
                transcript_id: { S: transcript_id },
                text: { S: text },
                tag: { S: tag || "" },
                startIdx: { N: String(startIdx) },
                endIdx: { N: String(endIdx) },
                files: { L: files.map((file) => ({ S: file })) },
                created_at: { S: new Date().toISOString() },
                updated_at: { S: new Date().toISOString() },
            },
        });

        await client.send(command);

        return NextResponse.json({
            message: "Comment added successfully",
            comment_id,
        });
    } catch (err) {
        console.error("Error adding comment:", err);
        return NextResponse.json(
            { error: "Failed to add comment" },
            { status: 500 }
        );
    }
}
