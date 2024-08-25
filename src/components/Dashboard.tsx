import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

const transcripts = [
    {
        title: "Sales Call Transcript",
        description: "Sales call for a new product",
        created_by: "Joe",
        number_comments: 3,
        tags: ["Change", "Fix"]
    },
    {
        title: "Research Interview Transcript",
        description: "Research interview for a new product",
        created_by: "Bob",
        number_comments: 5,
        tags: ["Improve", "Request"]
    },
    {
        title: "Restaurant Review Transcript",
        description: "Marketing research for a new restaurant",
        created_by: "Mark",
        number_comments: 2,
        tags: ["Change", "Fix", "Request"]
    },
    {
        title: "Sales Pitch Transcript",
        description: "Sales pitch for a new product",
        created_by: "Alice",
        number_comments: 7,
        tags: ["Improve"]
    },
];

const Dashboard = () => {
    return (
        <section className="container relative flex flex-col gap-8 pt-8 px-8 mb-20 md:px-12 lg:px-20">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {transcripts.map((transcript, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                {transcript.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                {transcript.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>{transcript.created_by[0]}</AvatarFallback>
                                </Avatar>

                                <span className="text-sm font-medium">
                                    {transcript.created_by}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {transcript.number_comments} comments
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {transcript.tags.map((tag, index) => (
                                    <Badge key={index}>{tag}</Badge>
                                ))}
                            </div>
                            <Button asChild>
                                <Link href={`/transcripts/${index}`}>
                                    View Transcript
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
