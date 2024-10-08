"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Container, Button, TextField, Box, Typography } from "@mui/material";
import AnnotatePage from "@/components/AnnotatePage";
import LLMSummary from "@/components/LLMSummary";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import getUser from "@/lib/getUser";
import Annotator from "@/components/Annotator";

export default function Home() {
    // const user = await currentUser();
    // console.log(user);

    // const { userId } = auth();
    // console.log(userId);

    useEffect(() => {
        async function fetchTables() {
            try {
                const response = await fetch("/api/list-tables");
                const data = await response.json();
                console.log("Tables:", data.tables);
            } catch (err) {
                console.error("Error fetching tables:", err);
            }
        }

        async function fetchTranscripts() {
            try {
                const userId = await getUser();

                if (!userId) {
                    console.error("User ID is required");
                    return;
                }

                console.log("User ID:", userId);

                const response = await fetch("/api/transcripts/" + userId);
                const data = await response.json();
                console.log("Transcripts:", data.transcripts);
            } catch (err) {
                console.error("Error fetching transcripts:", err);
            }
        }

        async function fetchTranscript(transcriptId: string) {
            try {
                const userId = await getUser();

                if (!userId) {
                    console.error("User ID is required");
                    return;
                }

                console.log("User ID:", userId);

                const response = await fetch(`/api/transcripts/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId, transcriptId }),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Transcript:", data);
            } catch (error) {
                console.error("Error fetching transcript:", error);
            }
        }

        async function createTranscript() {
            try {
                const user_id = await getUser();

                if (!user_id) {
                    console.error("User ID is required");
                    return;
                }

                console.log("User ID:", user_id);

                const transcript = {
                    transcript_id: "4",
                    s3_url: "https://example.com/transcript",
                    summary: "This is a summary",
                };

                const response = await fetch("/api/transcripts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id, ...transcript }),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Transcript:", data);
            } catch (error) {
                console.error("Error creating transcript:", error);
            }
        }

        async function updateTranscript() {
            try {
                const user_id = await getUser();

                if (!user_id) {
                    console.error("User ID is required");
                    return;
                }

                console.log("User ID:", user_id);

                const transcriptId = "1";
                const s3_url = "https://example.com/transcript";
                const summary = "This is an updated summary";

                const response = await fetch(`/api/transcripts`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id,
                        transcriptId,
                        s3_url,
                        summary,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Transcript:", data);
            } catch (error) {
                console.error("Error updating transcript:", error);
            }
        }

        // fetchTables();
        // fetchTranscripts();
        // fetchTranscript("1");
        // createTranscript();
        // updateTranscript();
    }, []);

    return (
        <>
            <SignedIn>
                <Dashboard />
            </SignedIn>
            <SignedOut>
                <LandingPage />
            </SignedOut>
        </>
    );
}
