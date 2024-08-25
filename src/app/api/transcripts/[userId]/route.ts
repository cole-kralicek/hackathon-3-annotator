import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, QueryCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
});

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.pathname.split("/").pop() || "";

    if (!userId) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
        );
    }

    console.log("User ID:", userId);

    try {
        const command = new QueryCommand({
            TableName: "Transcripts",
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
                ":user_id": { S: userId },
            },
        });

        const response = await client.send(command);

        console.log("Response:", response);
        
        if (!response.Items) {
            return NextResponse.json({ transcripts: [] });
        }

        const transcripts = response.Items.map((item) => ({
            transcript_id: item.transcript_id?.S || "",
            s3_url: item.s3_url?.S || "",
            summary: item.summary?.S || "",
            created_at: item.created_at?.S || "",
        }));

        return NextResponse.json({ transcripts });
    } catch (err) {
        console.error("Error fetching transcripts:", err);
        return NextResponse.json(
            { error: "Failed to fetch transcripts" },
            { status: 500 }
        );
    }
}


// Get a Transcript by ID
export async function POST(req: NextRequest) {
    try {
        const { userId, transcriptId } = await req.json();

        if (!userId || !transcriptId) {
            return NextResponse.json(
                { error: "User ID and Transcript ID are required" },
                { status: 400 }
            );
        }

        const command = new GetItemCommand({
            TableName: "Transcripts",
            Key: {
                user_id: { S: userId },
                transcript_id: { S: transcriptId },
            },
        });

        const response = await client.send(command);

        if (!response.Item) {
            return NextResponse.json(
                { error: "Transcript not found" },
                { status: 404 }
            );
        }

        const transcript = {
            transcript_id: response.Item.transcript_id.S,
            s3_url: response.Item.s3_url.S,
            summary: response.Item.summary.S,
            created_at: response.Item.created_at.S,
        };

        return NextResponse.json({ transcript });
    } catch (err) {
        console.error("Error fetching transcript:", err);
        return NextResponse.json(
            { error: "Failed to fetch transcript" },
            { status: 500 }
        );
    }
}