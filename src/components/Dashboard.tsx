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
        title: "Transcript 1",
        description: "This is the first transcript",
        created_by: "User 1",
        number_comments: 3,
        tags: ["tag1", "tag2", "tag3"],
    },
    {
        title: "Transcript 2",
        description: "This is the second transcript",
        created_by: "User 2",
        number_comments: 5,
        tags: ["tag1", "tag2", "tag3"],
    },
    {
        title: "Transcript 3",
        description: "This is the third transcript",
        created_by: "User 3",
        number_comments: 2,
        tags: ["tag1", "tag2", "tag3"],
    },
    {
        title: "Transcript 4",
        description: "This is the fourth transcript",
        created_by: "User 4",
        number_comments: 7,
        tags: ["tag1", "tag2", "tag3"],
    },
    {
        title: "Transcript 5",
        description: "This is the fifth transcript",
        created_by: "User 5",
        number_comments: 1,
        tags: ["tag1", "tag2", "tag3"],
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
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
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
