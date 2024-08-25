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



    // useEffect(() => {
    //     console.log("Hello");
    //     const user = { userId: "123", name: "John Doe", email: "hello@gmail.com" };
    //     main(user).catch(console.error);
    // }, []);


  

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
