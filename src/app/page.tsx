"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Container, Button, TextField, Box, Typography } from "@mui/material";
import AnnotatePage from "@/components/AnnotatePage";
import LLMSummary from "@/components/LLMSummary";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { DynamoDBClient, ListTablesCommand, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

// // Ensure you have AWS credentials in your environment
// const client = new DynamoDBClient({
//     region: "us-west-1",
//     credentials: {
//         accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
//         secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
//     },
// });

// async function main({userId, name, email}: {userId: string, name: string, email: string}) {
//     try {
//         const command = new ListTablesCommand({}); 
//         const response = await client.send(command);
//         console.log({ tables: response.TableNames });

//         const putCommand = new PutItemCommand({
//             TableName: "Users",
//             Item: {
//                 user_id: { S: userId },
//                 name: { S: name },
//                 email: { S: email },
//             },
//         });
//         // const putResponse = await client.send(putCommand);

//         const getCommand = new GetItemCommand({
//             TableName: "Users",
//             Key: {
//                 user_id: { S: userId },
//             },
//         });
//         const getResponse = await client.send(getCommand);
//         console.log({ user: getResponse.Item });
//     } catch (err) {
//         console.error("Error fetching tables:", err);
//     }
// }

export default function Home() {
    // const user = await currentUser();
    // console.log(user);

    // const { userId } = auth();
    // console.log(userId);

    // Text to be displayed in center box
    const [textArray, setTextArray] = useState<string[]>([]);
    // Name of file displayed
    const [fileName, setFileName] = useState<string>("");
    // Save highlighted text
    const [highlightedText, setHighlightedText] = useState<string | null>();
    // Highlight mode selection (aka words or partial)
    const [highlightFullWords, setHighlightFullWords] = useState<boolean>(true);

    // useEffect(() => {
    //     console.log("Hello");
    //     const user = { userId: "123", name: "John Doe", email: "hello@gmail.com" };
    //     main(user).catch(console.error);
    // }, []);

    const handleTextSelect = (index: number) => {
        if (!highlightFullWords) {
            const selected = window.getSelection();
            if (selected && selected.rangeCount > 0) {
                console.log(selected.toString());
                console.log(selected.getRangeAt(0).endOffset);
                setHighlightedText(window.getSelection()?.toString());
                const range = selected?.getRangeAt(0).getBoundingClientRect();
                console.log(range);
            }
        } else {
            console.log(textArray[index]);
        }
    };

    // Function to convert file upload into array of strings for DB storage
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result;
                if (typeof result === "string") {
                    // Here I assume the line break is formatted like this for now
                    const replacement = result.replaceAll(
                        "\r\n\r\n",
                        " \r\n\r\n "
                    );
                    const wordsList = replacement.split(" ");
                    setTextArray(wordsList);
                    console.log(wordsList);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <SignedIn>
                {/* <Dashboard /> */}
                <AnnotatePage />
                <LLMSummary />
            </SignedIn>
            <SignedOut>
                <LandingPage />
            </SignedOut>
        </>
    );
}
