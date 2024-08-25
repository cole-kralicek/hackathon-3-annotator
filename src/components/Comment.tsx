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
import { Edit, DeleteIcon, ExternalLink, Image, Video, File, FileAudio } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface CommentProps {
    username: string;
    firstName: string;
    lastName: string;
    userImage: string;
    comment: string;
    files: File[];
    tag: string;
}

const Comment = ({
    username,
    firstName,
    lastName,
    userImage,
    comment,
    files,
    tag,
}: CommentProps) => {
    return (
        <Card className="relative w-full">
            <>{console.log(files)}</>
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
                <div className="w-full flex flex-row gap-2 justify-between items-center h-auto">
                    <div className="flex flex-row gap-1 w-3/4">
                         {files.length > 0 &&
                            files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-start w-1/4"
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <div className="flex items-center justify-center w-full p-2 rounded-md border-[1px] cursor-pointer">
                                                 {file.type.includes(
                                                            "image"
                                                        ) ? (
                                                            <Image size={18} />
                                                        ) : file.type.includes(
                                                              "video"
                                                          ) ? (
                                                            <Video size={18} />
                                                        ) : file.type.includes(
                                                              "pdf"
                                                          ) ? (
                                                            <File size={18} />
                                                        ) : file.type.includes(
                                                              "audio"
                                                          ) ? (
                                                            <FileAudio
                                                                size={18}
                                                            />
                                                        ) : (
                                                            <File size={18} />
                                                        )}
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="top">
                                            <div className="flex flex-col gap-1 p-2 max-w-[240px]">
                                                <p className="font-semibold text-sm">
                                                    File: {file.name}
                                                </p>
                                                <p className="text-sm">
                                                    Type: {file.type}
                                                </p>

                                                <Link
                                                    href={URL.createObjectURL(
                                                        file
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs"
                                                >
                                                    <Button
                                                        type="button"
                                                        className="flex items-center justify-center text-xs w-full mt-3"
                                                    >
                                                        Open
                                                        <ExternalLink
                                                            size={14}
                                                            className="ml-2"
                                                        />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}

                        {files.length === 0 && (
                            <div className="flex items-center justify-center w-full p-2 rounded-md border-[1px]">
                                <span className="text-sm text-muted-foreground">
                                    No files
                                </span>
                            </div>
                        )} 
                    </div> 
                    <p className="text-sm text-muted-foreground">
                        {files.length}/3
                    </p>

                </div>
                <div className="absolute top-2 right-4 flex flex-row self-end gap-2">
                    <Edit onClick={() => console.log("edit test")} className="cursor-pointer" />
                    <DeleteIcon onClick={() => console.log("delete test")} className="cursor-pointer" />
                </div>
            </CardContent>
        </Card>
    );
};

export default Comment;
