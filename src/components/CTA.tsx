import React, { useRef } from "react";
import { delay, motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

const CTA = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
            delay: 0.2,
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.section
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="container flex flex-col mb-10 items-center gap-6 sm:gap-10 relative py-20"
        >
            <motion.h2
                variants={itemVariants}
                className="text-3xl font-heading font-semibold text-center sm:text-4xl max-w-xl"
            >
                Ready to get started?
            </motion.h2>
            <motion.p
                variants={itemVariants}
                className="text-center text-lg max-w-xl text-muted-foreground"
            >
                Sign up today and start your fitness journey for free! Chat with
                our AI coaches and get personalized workout plans and nutrition
                advice.
            </motion.p>
            <motion.div variants={itemVariants}>
                <Button size="lg" className="py-4 px-8 text-base border-border">
                    <Link href="/login">Get Started</Link>
                </Button>
            </motion.div>
        </motion.section>
    );
};

export default CTA;
