import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const LLMSummary = () => {
    return (
        <section className="container relative flex flex-col items-center px-8 mt-12 mb-20 md:px-12 lg:px-20">
            <Card className="flex flex-col gap-2 w-full">
                <CardHeader className="px-12">
                    <CardTitle className="text-2xl font-semibold">
                        Summary
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        This is a summary of the document. It will be generated
                        based on the annotations made by the users.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 border-b-4 border-primary rounded-md">
                    <div className="w-full px-12">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold">Key Points</h3>
                            <ul className="list-disc list-inside">
                                <li>Key point 1</li>
                                <li>Key point 2</li>
                                <li>Key point 3</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default LLMSummary;
