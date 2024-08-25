import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Edit, DeleteIcon } from "lucide-react";

interface CommentProps {
    username: string;
    firstName: string;
    lastName: string;
    userImage: string;
    comment: string;
    tag: string;
    // files: string[];
}

const Comment = ({
    username,
    firstName,
    lastName,
    userImage,
    comment,
    tag,
    // files,
}: CommentProps) => {
    return (
        <Card className="relative w-full">
            <CardHeader className="flex flex-row items-center -mb-2 gap-2 justify-start">
                <Avatar>
                    <AvatarImage src={userImage} alt={username} />
                    <AvatarFallback>
                        {firstName[0] + lastName[0]}
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-semibold">
                    @{username}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 mt-2 border-b-4 border-primary rounded-md">
                <Badge className="mr-auto">{tag}</Badge>
                <p className="text-sm text-muted-foreground">{comment}</p>
                <div className="absolute top-2 right-4 flex flex-row self-end gap-2">
                    <Edit className="cursor-pointer" />
                    <DeleteIcon className="cursor-pointer" />
                </div>
            </CardContent>
        </Card>
    );
};

export default Comment;
