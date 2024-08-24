"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Features from "@/components/Features";
import { motion, animate } from "framer-motion";

const Hero = () => {
    const goToFeatures = () => {
        const features = document.getElementById("features");
        if (features) {
            const y = features.getBoundingClientRect().top + window.scrollY;

            animate(window.scrollY, y, {
                duration: 0.8,
                ease: [0.42, 0, 0.58, 1],
                onUpdate: (latest) => window.scrollTo(0, latest),
            });
        }
    };

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: "easeIn",
                duration: 0.5,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <>
            <motion.section
                className="container flex flex-col items-center gap-8 pt-20 sm:gap-10"
                variants={variants}
                initial="hidden"
                animate="animate"
            >
                <motion.div variants={childVariants}>
                    <Badge
                        className="px-4 py-1 text-md gap-4"
                        variant="secondary"
                    >
                        Introducing CardGenAI <ArrowRight />
                    </Badge>
                </motion.div>
                <motion.h1
                    variants={childVariants}
                    className="text-4xl font-heading font-semibold max-w-5xl text-center sm:text-5xl sm:leading-tight"
                >
                    Your Personal AI-Study Tool to Prepare Flashcards
                </motion.h1>
                <motion.p
                    variants={childVariants}
                    className="text-center text-lg max-w-lg text-muted-foreground sm:text-xl"
                >
                    Create Flashcards with ease and let the AI do the rest.
                    Study smarter, not harder.
                </motion.p>
                <motion.div
                    variants={childVariants}
                    className="flex flex-row items-center gap-4"
                >
                    <Button onClick={goToFeatures} size="lg" variant="outline">
                        Learn More
                    </Button>
                    <Button size="lg">
                        <Link href="/login">Get Started</Link>
                    </Button>
                </motion.div>
                <motion.div
                    variants={childVariants}
                    className="relative sm:mt-8 mb-4 shadow-lg"
                >
                    <Image
                        className=" rounded-xl"
                        src="/hero.png"
                        alt="Hero Image"
                        fill={false}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "1000px", height: "auto" }}
                        priority={true}
                    />
                </motion.div>
            </motion.section>
            <Features />
        </>
    );
};

export default Hero;
