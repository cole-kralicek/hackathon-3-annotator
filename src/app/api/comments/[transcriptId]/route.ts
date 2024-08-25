import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
});

export async function GET(req: NextRequest) {
    const transcriptId = req.nextUrl.pathname.split("/").pop() || "";

    if (!transcriptId) {
        return NextResponse.json(
            { error: "Transcript ID is required" },
            { status: 400 }
        );
    }

    try {
        const command = new QueryCommand({
            TableName: "Comments",
            KeyConditionExpression: "transcript_id = :transcript_id",
            ExpressionAttributeValues: {
                ":transcript_id": { S: transcriptId },
            },
        });

        const response = await client.send(command);

        const comments = response.Items.map((item) => ({
            comment_id: item.comment_id.S,
            text: item.text.S,
            tag: item.tag.S,
            startIdx: Number(item.startIdx.N),
            endIdx: Number(item.endIdx.N),
            files: item.files.L.map((file) => file.S),
            created_at: item.created_at.S,
            updated_at: item.updated_at.S,
        }));

        return NextResponse.json({ comments });
    } catch (err) {
        console.error("Error fetching comments:", err);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}
