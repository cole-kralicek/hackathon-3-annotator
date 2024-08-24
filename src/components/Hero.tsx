"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Features from "@/components/Features";

const Hero = () => {
    const goToFeatures = () => {
        const features = document.getElementById("features");
        if (features) {
            features.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    return (
        <>
            <section className="container flex flex-col items-center gap-8 pt-20 sm:gap-10">
                <Badge className="px-4 py-1 text-md gap-4" variant="secondary">
                    Introducing CardGenAI <ArrowRight />
                </Badge>
                <h1 className="text-4xl font-heading font-semibold max-w-5xl text-center sm:text-5xl sm:leading-tight">
                    Your Personal AI-Study Tool to Prepare Flashcards
                </h1>
                <p className="text-center text-lg max-w-lg text-muted-foreground sm:text-xl">
                    Create Flashcards with ease and let the AI do the rest.
                    Study smarter, not harder.
                </p>
                <div className="flex flex-row items-center gap-4">
                    <Button onClick={goToFeatures} size="lg" variant="outline">
                        Learn More
                    </Button>
                    <Button size="lg">
                        <Link href="/login">Get Started</Link>
                    </Button>
                </div>
                <div className="relative sm:mt-8 mb-4 shadow-lg">
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
                </div>
            </section>
            <Features />
            
        </>
    );
};

export default Hero;
