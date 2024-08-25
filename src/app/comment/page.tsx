'use client'
import { useState, useEffect, ChangeEvent, useRef } from "react";
import './page.css'
import { ScrollArea } from "@/components/ui/scroll-area";
import Comment from "@/components/Comment";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircleMore, X } from "lucide-react";
import { Box, Modal, Stack, TextField, Typography } from "@mui/material";
import { Button as MUIButton } from "@mui/material"


const AnnotatePage = () => {
    // Comment data type
    interface Comment {
        range: number[],
        color: string,
        comment: string
    }

    interface DisplayedComment {
        username: string,
        firstName: string,
        lastName: string,
        userImage: string,
        comment: Comment,
        tag: string,
    }

    // Highlight color map based on current tag
    const colorMap = {
        "Positive": "#44c950",
        "Suggestion": "yellow",
        "Fix": "#f73131"
    }

    // Text to be displayed in center box
    const [textArray, setTextArray] = useState<string[]>([]);
    // Name of file displayed
    const [fileName, setFileName] = useState<string>('');
    // Save currrent highlighted words and indices
    const [highlightedText, setHighlightedText] = useState<string | null>();
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    // This contains all indices saved in the entire file
    const [fileHighlights, setFileHighlights] = useState<number[]>([]);
    // Array of all comments in order of arrival
    const [allComments, setAllComments] = useState<Comment[]>([]);
    // Map to connect arrival index to text index for fast retrieval
    const [commentMap, setCommentMap] = useState<Map<number, number>>(new Map());
    // Comment array to be displayed
    const [completeComments, setCompleteComments] = useState<Array<DisplayedComment>>([]);
    // Ref for new comments (used for scrollable functionality)
    const commentRefs = useRef<(HTMLDivElement | null)[]>([]);
    // Highlight mode selection (aka words or partial)
    const [highlightFullWords, setHighlightFullWords] = useState<boolean>(true);
    // Open comment dialog box
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    // Comment (text) currently edited in modal
    const [textComment, setTextComment] = useState<string>('')
    const [lastComment, setLastComment] = useState<Comment>({
        range: [-1],
        color: 'transparent',
        comment: ''
    })
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tag, setTag] = useState<{ tag: string, color: string }>({ tag: "Suggestion", color: "yellow" });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    // Function to convert file upload into array of strings for DB storage
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    // Here I assume the line break is formatted like this for now
                    const replacement = result.replaceAll("\r\n\r\n", " \r\n\r\n ");
                    const wordsList = replacement.split(' ');
                    setTextArray(wordsList);
                    console.log(wordsList);
                }
            };
            reader.readAsText(file);
        }
    };

    // Update highlighted "words" for each new index selected
    useEffect(() => {
        const currentSelected: any = []
        selectedIndices.forEach((index) => currentSelected.push(textArray[index]))
        setHighlightedText(currentSelected.join(" "))
    }, [selectedIndices])

    // Print final index list of document for every new comment
    useEffect(() => {
        console.log("All selected indices: ", fileHighlights)
        console.log("All comments ranges: ", allComments)
        console.log("Comment map: ", commentMap)
        console.log("Last comment: ", lastComment)
        console.log("complete comments: ", completeComments)

    }, [fileHighlights, allComments, commentMap, lastComment, completeComments])

    // For debugging current selected
    useEffect(() => {
        console.log("Current selected indices: ", selectedIndices);
    }, [selectedIndices])

    const handleMouseDown = (index: number) => {
        setIsMouseDown(true);
        if (!selectedIndices.includes(index)) {
            setSelectedIndices([index]); //Begin recording selected indices
        }
    };

    const handleMouseEnter = (index: number) => {
        if (isMouseDown) {
            setSelectedIndices(prev => {
                if (!prev.includes(index)) {
                    return [...prev, index]; // Add index to the current selection
                }
                return prev.sort();
            });
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        // Push final (current) selection to the overall file highlights
        selectedIndices.forEach((index) => {
            if (!fileHighlights?.includes(index)) {
                setFileHighlights(prev => {
                    return [...prev, index];
                })
            }
        })
        // Open dialog to save comment if the text isnt highlighted
        const isHighlighted = selectedIndices.some((index) => fileHighlights.includes(index));
        if (!isHighlighted) {
            setOpenDialog(true);
        }

    };

    const handleSetComment = () => {
        const newComment = { range: selectedIndices, color: tag.color, comment: textComment };
        setLastComment(newComment);

        const comment: DisplayedComment = {
            username: "me",
            firstName: "first",
            lastName: "last",
            userImage: "https://github.com/shadcn.png",
            comment: newComment,
            tag: tag.tag,
        };
        const newArray = [...completeComments, comment];
        setCompleteComments(newArray)
    }

    const updateComments = () => {

        setAllComments(prev => {
            const updatedComments = [...prev, lastComment];
            // Map allcomment index to start index of comment (index represents start of comment index)
            setCommentMap(prevMap => {
                const updatedMap = new Map(prevMap);
                updatedMap.set(lastComment.range[0], updatedComments.length - 1);
                return updatedMap;
            });
            return updatedComments;
        })
        console.log("Last selected word indices:", selectedIndices);
    }

    const handleClickCommented = (index: number) => {
        // Find the corresponding comment based on the index
        const correspondingComment = completeComments.find(dispComment =>
            dispComment.comment.range.includes(index)
        );

        if (correspondingComment) {
            // Scroll to the corresponding comment
            const commentIndex = completeComments.indexOf(correspondingComment);
            const commentRef = commentRefs.current[commentIndex];

            if (commentRef) {
                commentRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };

    const comment = [
        {
            username: "JohnDoe",
            firstName: "John",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "This is a comment",
            tag: "Change",
        },
    ];

    // bg-[var(--card)] text-foreground

    return (
        <section className="container relative flex flex-col md:flex-row items-start gap-8 pt-8 px-8 md:px-12 lg:px-20 sm:gap-10 min-h-[calc(100vh-200px)]">
            <div className="flex flex-col items-center gap-4 w-full rounded-md p-4 bg-foreground text-background md:w-1/2 lg:w-3/4">


                <input
                    type="file"
                    id="file-upload"
                    //style={{ display: 'none' }} // Hide the input if we make a cooler button
                    onChange={e => {
                        const file = e.target.value;
                        setFileName(file.slice(file.lastIndexOf("\\") + 1));
                        handleFileUpload(e);
                    }}
                />



                <p>{fileName != '' ? "File displayed: " + fileName : ""}</p>
                <ScrollArea className="prevent-select h-[70vh] w-full text-sm mt-4 pl-4 pr-6 pb-4"
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        width: '100%',
                        margin: 0
                    }}>
                    {textArray.map((word, index) => {
                        const isHighlighted = selectedIndices.includes(index) || fileHighlights.includes(index);
                        // Find the comment associated with the current index
                        const comment = completeComments.find(dispComment =>
                            dispComment.comment.range.includes(index)
                        );
                        // Either current tag color or saved comment color
                        const highlightColor = comment ? comment.comment.color : tag.color;

                        return (
                            <span
                                key={index}
                                onMouseDown={() => handleMouseDown(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseUp={handleMouseUp}
                                style={{
                                    backgroundColor: isHighlighted ? highlightColor : 'transparent',
                                    cursor: 'pointer',
                                    padding: '0 2px',
                                }}
                                onClick={isHighlighted ? () => handleClickCommented(index) : undefined}
                            >
                                {isHighlighted ? (
                                    <a

                                        onClick={e => {
                                            handleClickCommented(index);
                                        }}
                                        style={{ color: 'inherit', textDecoration: 'underline' }}
                                    >
                                        {word.includes("\n") ? word : word + " "}
                                    </a>
                                ) : (
                                    word.includes("\n") ? word : word + " "
                                )}
                            </span>
                        );
                    })}
                </ScrollArea>
            </div>
            <div className="hidden md:flex flex-col h-[75vh] items-center gap-4 w-full md:w-1/2 lg:w-1/4">
                <h2 className="text-start self-start text-lg font-semibold">
                    Comments
                </h2>

                <ScrollArea className="h-[100%] w-full">
                    <div className="flex flex-col flex-1 gap-4">
                        {completeComments.map((comment, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    commentRefs.current[index] = el
                                }}
                            >
                                <Comment
                                    key={index}
                                    username={comment.username}
                                    firstName={comment.firstName}
                                    lastName={comment.lastName}
                                    userImage={comment.userImage}
                                    comment={comment.comment.comment}
                                    tag={comment.tag}
                                />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <Separator className="pt-auto" />
                {openDialog && (
                    <div className="w-full flex flex-col justify-self-end items-center gap-2 p-4 border-[1px] border-primary rounded-sm">
                        <Label className="text-sm hidden">Add a comment</Label>
                        <Textarea
                            className="w-full"
                            placeholder="Add new comment here..."
                            value={textComment}
                            onChange={(e) => setTextComment(e.target.value)}
                        />
                        <Select
                            onValueChange={(value) => setTag({ tag: value, color: colorMap[value as keyof typeof colorMap] })}>
                            <SelectTrigger>
                                <SelectValue placeholder={tag.tag} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Positive">Positive</SelectItem>
                                <SelectItem value="Suggestion">Suggestion</SelectItem>
                                <SelectItem value="Fix">Fix</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full"
                            onClick={() => {
                                handleSetComment()
                                updateComments()
                                setTextComment('')
                                setSelectedIndices([])
                                setOpenDialog(false)
                            }}
                        >Add Comment</Button>
                    </div>
                )}
            </div>

            {/* Sidebar Toggle Button for Smaller Screens */}
            <Button
                onClick={toggleSidebar}
                className="md:hidden absolute top-4 right-4 z-50 bg-primary p-2 rounded-full shadow-lg"
                size="icon"
            >
                {isSidebarOpen ? (
                    <X size={20} />
                ) : (
                    <MessageCircleMore size={20} />
                )}
            </Button>

            {/* Sidebar Overlay for Smaller Screens */}
            <div
                className={`absolute top-6 right-0 h-full w-[80%] bg-background p-4 shadow-lg z-40 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden`}
            >
                <h2 className="text-start self-start text-lg font-semibold mb-4">
                    Comments
                </h2>

                <ScrollArea className="h-[60%] w-full mb-2">
                    <div className="flex flex-col flex-1 gap-4">
                        {completeComments.map((comment, index) => (
                            <div
                            // key={index}
                            // ref={(el) => { commentRefs.current[index] = el }}
                            >
                                <Comment
                                    key={index}
                                    username={comment.username}
                                    firstName={comment.firstName}
                                    lastName={comment.lastName}
                                    userImage={comment.userImage}
                                    comment={comment.comment.comment}
                                    tag={comment.tag}
                                />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <Separator className="pt-auto" />
                {openDialog && (
                    <div className="w-full flex flex-col justify-self-end items-center gap-2 p-4 border-[1px] border-primary rounded-sm bg-background">
                        <Label className="text-sm hidden">Add a comment</Label>
                        <Textarea
                            className="w-full"
                            placeholder="Add new comment here..."
                            value={textComment}
                            onChange={(e) => setTextComment(e.target.value)}
                        />
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Tag" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="improve">Improve</SelectItem>
                                <SelectItem value="change">Change</SelectItem>
                                <SelectItem value="fix">Fix</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full" onClick={() => {
                            handleSetComment()
                            updateComments()
                            setTextComment('')
                            setOpenDialog(false)
                        }}>Add Comment</Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AnnotatePage;
