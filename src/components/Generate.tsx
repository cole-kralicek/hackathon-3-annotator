"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function Generate() {
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const maxLength = 4000;

    const handleChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPrompt(e.target.value);
    };

    // const handleSubmit = async () => {
    //     if (!prompt.trim()) {
    //         setError("Please enter some text to generate flashcards.");
    //         return;
    //     }
    //     setError("");
    //     setLoading(true);
    //     try {
    //         const response = await fetch("/api/generate", {
    //             method: "POST",
    //             body: JSON.stringify({ prompt, number }),
    //         });
    //         setPrompt("");

    //         const data = await response.json();
    //         setFlashcard(data);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <Card className="w-full mb-20">
            <CardHeader>
                <CardTitle>AI Generated</CardTitle>
                <CardDescription>
                    Type in a topic or text to generate transcript with AI
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="prompt">Topic</Label>
                        <Textarea
                            placeholder="Enter your topic to generate flashcards."
                            id="prompt"
                            name="prompt"
                            onChange={handleChange}
                            maxLength={maxLength}
                            disabled={loading}
                            value={prompt}
                        />
                        <p className="text-sm text-muted-foreground text-end">
                            {maxLength - prompt.length} characters remaining
                        </p>
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                    </div>
                    
                    <Button
                        disabled={loading}
                        onClick={() => {}}
                        type="submit"
                    >
                        {loading ? "Generating Transcript" : "Generate Transcript"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
