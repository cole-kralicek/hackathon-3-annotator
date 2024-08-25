"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { File, Upload } from "lucide-react";

export default function UploadFile() {
    const [file, setFile] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e: { target: { files: any } }) => {
        console.log("in file change ", e.target.files);
        const tempfile = e.target.files[0];
        if (tempfile && tempfile.type === "application/pdf") {
            setFile(tempfile);
            setError("");
        } else {
            setError("Please upload a valid PDF file.");
        }
    };

    // const handleSubmit = async (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     if (!file) return;

    //     setFileLoading(true);
    //     setError("");

    //     const formData = new FormData();
    //     formData.set("pdfFile", file);
    //     formData.set("instructions", instructions);

    //     try {
    //         const res = await fetch("/api/uploadfile", {
    //             method: "POST",
    //             body: formData,
    //         });

    //         if (!res.ok) {
    //             throw new Error("Failed to generate Q&A");
    //         } else {
    //             const data = await res.json();
    //         }
    //         //   set the flashcard here
    //     } catch (error: any) {
    //         console.error(error);
    //         setError(error.message);
    //     } finally {
    //         setFileLoading(false);
    //     }
    // };

    return (
        <div className="w-full mb-20">
            <Card>
                <CardHeader>
                    <CardTitle>Upload File</CardTitle>
                    <CardDescription>
                        Upload a TXT/PDF File with content to generate
                        transcript
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4 items-center">
                        <Label htmlFor="file" className="hidden">
                            Choose a file
                        </Label>
                        <div className="flex items-center justify-center w-[300px] h-32 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer relative">
                            <Input
                                type="file"
                                accept=".pdf, .txt"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                // className="flex items-center justify-center text-center self-center w-[300px] h-32 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center">
                                <Upload size={48} className="text-background" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Upload PDF or TXT file
                                </p>    
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )}

                        <Button
                            disabled={fileLoading}
                            type="submit"
                            onClick={() => {}}
                            className="w-full"
                        >
                            {fileLoading
                                ? "Generating Transcript..."
                                : "Generate Transcript"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
