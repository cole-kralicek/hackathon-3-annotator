import { NextRequest, NextResponse } from "next/server";
import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
});

// Create or Update a Transcript
export async function POST(req: NextRequest) {
    const { user_id, transcript_id, s3_url, summary } = await req.json();

    if (!user_id || !transcript_id || !s3_url) {
        return NextResponse.json(
            { error: "User ID, transcript ID, and S3 URL are required" },
            { status: 400 }
        );
    }

    try {
        const command = new PutItemCommand({
            TableName: "Transcripts",
            Item: {
                user_id: { S: user_id },
                transcript_id: { S: transcript_id },
                s3_url: { S: s3_url },
                summary: { S: summary || "" },
                created_at: { S: new Date().toISOString() },
            },
        });

        await client.send(command);

        return NextResponse.json({
            message: "Transcript added/updated successfully",
        });
    } catch (err) {
        console.error("Error adding/updating transcript:", err);
        return NextResponse.json(
            { error: "Failed to add/update transcript" },
            { status: 500 }
        );
    }
}

// Update a Transcript
export async function PUT(req: NextRequest) {
    // const transcriptId = req.nextUrl.pathname.split("/").pop() || "";
    const { user_id, transcriptId, s3_url, summary } = await req.json();

    if (!transcriptId || !user_id || !s3_url) {
        return NextResponse.json(
            { error: "Transcript ID, User ID, and S3 URL are required" },
            { status: 400 }
        );
    }

    try {
        const command = new UpdateItemCommand({
            TableName: "Transcripts",
            Key: {
                user_id: { S: user_id },
                transcript_id: { S: transcriptId },
            },
            UpdateExpression:
                "SET s3_url = :s3_url, summary = :summary, updated_at = :updated_at",
            ExpressionAttributeValues: {
                ":s3_url": { S: s3_url },
                ":summary": { S: summary || "" },
                ":updated_at": { S: new Date().toISOString() },
            },
        });

        await client.send(command);

        return NextResponse.json({
            message: "Transcript updated successfully",
        });
    } catch (err) {
        console.error("Error updating transcript:", err);
        return NextResponse.json(
            { error: "Failed to update transcript" },
            { status: 500 }
        );
    }
}

// Delete a Transcript
// export async function DELETE(req: NextRequest) {
//     const transcriptId = req.nextUrl.pathname.split("/").pop() || "";
//     const userId = req.nextUrl.searchParams.get("user_id") || "";

//     if (!transcriptId || !userId) {
//         return NextResponse.json(
//             { error: "Transcript ID and User ID are required" },
//             { status: 400 }
//         );
//     }

//     try {
//         const command = new DeleteItemCommand({
//             TableName: "Transcripts",
//             Key: {
//                 user_id: { S: userId },
//                 transcript_id: { S: transcriptId },
//             },
//         });

//         await client.send(command);

//         return NextResponse.json({
//             message: "Transcript deleted successfully",
//         });
//     } catch (err) {
//         console.error("Error deleting transcript:", err);
//         return NextResponse.json(
//             { error: "Failed to delete transcript" },
//             { status: 500 }
//         );
//     }
// }
