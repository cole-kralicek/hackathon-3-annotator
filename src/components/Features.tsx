import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Library, Share } from "lucide-react";
import { delay, motion, useInView } from "framer-motion";

const Features = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeIn",
                duration: 0.5,
            },
            delay: 0.2,
        },
    };

    return (
        <motion.section
            ref={ref}
            id="features"
            className="container flex flex-col items-center gap-6 py-20 sm:gap-7"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.3,
                    },
                },
            }}
        >
            <div className="flex flex-col gap-3">
                <span className="font-bold uppercase text-primary text-center">
                    Features
                </span>
                <h2 className="text-3xl font-heading font-semibold text-center sm:text-4xl">
                    Personalized for your Study Needs
                </h2>
            </div>
            <p className="text-center text-lg max-w-2xl text-muted-foreground">
                Our features are designed to help you study smarter, not harder.
                We have everything you need to get started with your flashcards
                journey.
            </p>
            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                <motion.div variants={cardVariants}>
                    <Card className="shadow-lg">
                        <CardContent className="flex flex-col items-start gap-4 p-6">
                            <div className="inline-flex items-center justify-center rounded-md border-border bg-secondary p-2">
                                <Bot
                                    size={28}
                                    strokeWidth={3}
                                    className="text-primary"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    AI-Flashcards
                                </h3>
                                <p className="text-muted-foreground">
                                    Create flashcards with ease with the help of
                                    AI or with file uploads.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={cardVariants}>
                    <Card className="shadow-lg">
                        <CardContent className="flex flex-col items-start gap-4 p-6">
                            <div className="inline-flex items-center justify-center rounded-md border-border bg-secondary p-2">
                                <Library
                                    size={28}
                                    strokeWidth={3}
                                    className="text-primary"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Public Library
                                </h3>
                                <p className="text-muted-foreground">
                                    Access thousands of flashcards created by
                                    others.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={cardVariants}>
                    <Card className="shadow-lg">
                        <CardContent className="flex flex-col items-start gap-4 p-6">
                            <div className="inline-flex items-center justify-center rounded-md border-border bg-secondary p-2">
                                <Share
                                    size={28}
                                    strokeWidth={3}
                                    className="text-primary"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Share Knowledge
                                </h3>
                                <p className="text-muted-foreground">
                                    Share your flashcards with your friends and
                                    classmates.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Features;
