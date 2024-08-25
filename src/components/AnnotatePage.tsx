import { useState, useEffect, ChangeEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Comment from "./Comment";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { MessageCircleMore, X } from "lucide-react";

const AnnotatePage = () => {
    const [textArray, setTextArray] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [highlightedText, setHighlightedText] = useState<string | null>();
    const [highlightFullWords, setHighlightFullWords] = useState<boolean>(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleTextSelect = (index: number) => {
        if (!highlightFullWords) {
            const selected = window.getSelection();
            if (selected && selected.rangeCount > 0) {
                console.log(selected.toString());
                console.log(selected.getRangeAt(0).endOffset);
                setHighlightedText(window.getSelection()?.toString());
                const range = selected?.getRangeAt(0).getBoundingClientRect();
                console.log(range);
            }
        } else {
            setHighlightedText(textArray[index]);
            console.log(textArray[index]);
        }
    };

    // Function to convert file upload into array of strings for DB storage
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result;
                if (typeof result === "string") {
                    // Here I assume the line break is formatted like this for now
                    const replacement = result.replaceAll(
                        "\r\n\r\n",
                        " \r\n\r\n "
                    );
                    const wordsList = replacement.split(" ");
                    setTextArray(wordsList);
                    console.log(wordsList);
                }
            };
            reader.readAsText(file);
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
        {
            username: "JaneDoe",
            firstName: "Jane",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "This is another comment",
            tag: "Improve",
        },
        {
            username: "JohnDoe",
            firstName: "John",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "Change this part as well",
            tag: "Feedback",
        },
        {
            username: "JaneDoe",
            firstName: "Jane",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "This is a suggestion",
            tag: "Suggestion",
        },
        {
            username: "JohnDoe",
            firstName: "John",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "This is a question",
            tag: "Question",
        },
        {
            username: "JaneDoe",
            firstName: "Jane",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "This is a remark",
            tag: "Remark",
        },
        {
            username: "JohnDoe",
            firstName: "John",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "This is a suggestion",
            tag: "Suggestion",
        },
        {
            username: "JaneDoe",
            firstName: "Jane",
            lastName: "Doe",
            userImage: "https://github.com/shadcn.png",
            comment: "This is a question",
            tag: "Question",
        },
    ];

    // bg-[var(--card)] text-foreground

    return (
        <section className="container relative flex flex-col md:flex-row items-start gap-8 pt-8 px-8 md:px-12 lg:px-20 sm:gap-10 min-h-[calc(100vh-200px)]">
            <div className="flex flex-col items-center gap-4 w-full rounded-md p-4 bg-foreground text-background md:w-1/2 lg:w-3/4">
                <ScrollArea className="h-[70vh] w-full text-sm mt-4 pl-4 pr-6 pb-4">
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                    And once they started laughing, they couldn't stop. Jokester
                    began sneaking into the castle in the middle of the night
                    and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                </ScrollArea>
            </div>
            <div className="hidden md:flex flex-col h-[75vh] items-center gap-4 w-full md:w-1/2 lg:w-1/4">
                <h2 className="text-start self-start text-lg font-semibold">
                    Comments
                </h2>

                <ScrollArea className="h-[100%] w-full">
                    <div className="flex flex-col flex-1 gap-4">
                        {comment.map((comment, index) => (
                            <Comment
                                key={index}
                                username={comment.username}
                                firstName={comment.firstName}
                                lastName={comment.lastName}
                                userImage={comment.userImage}
                                comment={comment.comment}
                                tag={comment.tag}
                            />
                        ))}
                    </div>
                </ScrollArea>
                <Separator className="pt-auto" />
                {!highlightedText && (
                    <div className="w-full flex flex-col justify-self-end items-center gap-2 p-4 border-[1px] border-primary rounded-sm">
                        <Label className="text-sm hidden">Add a comment</Label>
                        <Textarea
                            className="w-full"
                            placeholder="Add new comment here..."
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
                        <Button className="w-full">Add Comment</Button>
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
                className={`absolute top-6 right-0 h-full w-[80%] bg-background p-4 shadow-lg z-40 ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden`}
            >
                <h2 className="text-start self-start text-lg font-semibold mb-4">
                    Comments
                </h2>

                <ScrollArea className="h-[60%] w-full mb-2">
                    <div className="flex flex-col flex-1 gap-4">
                        {comment.map((comment, index) => (
                            <Comment
                                key={index}
                                username={comment.username}
                                firstName={comment.firstName}
                                lastName={comment.lastName}
                                userImage={comment.userImage}
                                comment={comment.comment}
                                tag={comment.tag}
                            />
                        ))}
                    </div>
                </ScrollArea>
                <Separator className="pt-auto" />
                {!highlightedText && (
                    <div className="w-full flex flex-col justify-self-end items-center gap-2 p-4 border-[1px] border-primary rounded-sm bg-background">
                        <Label className="text-sm hidden">Add a comment</Label>
                        <Textarea
                            className="w-full"
                            placeholder="Add new comment here..."
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
                        <Button className="w-full">Add Comment</Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AnnotatePage;
