import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="container flex flex-col items-center gap-6 py-20 sm:gap-7">
            <div className="flex flex-col gap-3">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="font-bold uppercase text-primary text-center"
                >
                    FAQ
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-heading font-semibold text-center sm:text-4xl"
                >
                    Frequently Asked Questions
                </motion.h2>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center text-lg max-w-2xl text-muted-foreground"
            >
                For any questions, feel free to reach out to us. We&apos;re here
                to help.
            </motion.p>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="mt-6 w-full divide-y max-w-3xl"
            >
                <motion.div variants={itemVariants}>
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                                How do I get started?
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                                Getting started is easy! Simply create an
                                account and you&apos;re good to go. Upgrade your
                                account to create unlimited flashcard decks.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b-0">
                            <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                                How do I create flashcards?
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                                You can create flashcards by clicking on the
                                &lsquo;Create Flashcards&rsquo; button. Choose
                                to create a new deck manually, with a file
                                upload, or using AI genetation.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b-0">
                            <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                                How do I access the public library?
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                                You can access the public library by clicking on
                                the &lsquo;Home&rsquo; button once you are
                                logged in.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border-b-0">
                            <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                                Can I edit my flashcards that I get from AI?
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                                Yes, you can edit the flashcards that you get
                                from AI. You can add, remove, or modify any
                                content on the flashcards.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FAQ;
