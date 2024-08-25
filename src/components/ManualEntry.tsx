"use client";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ManualEntry = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    return (
        <Card className="w-full mb-20">
            <CardHeader>
                <CardTitle>Manual Entry</CardTitle>
                <CardDescription>
                    Type in your transcript manually
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="title">Transcript</Label>
                        <Textarea
                            id="title"
                            placeholder="Type in your transcript here"
                        />
                    </div>
                </form>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <Button onClick={() => {}} className="w-full">
                    Generate Transcript
                </Button>
            </CardContent>
        </Card>
    );
};

export default ManualEntry;
