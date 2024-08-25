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
                                account and you&apos;re good to go. 
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b-0">
                            <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                                How do I create transcripts?
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                                You can create transcripts by going to the Annotation
                                page and uploading your text file.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b-0">
                            <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                                What can I add in my comments?
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                                You can add anything you like in your comments.
                                You can add text, files, tags, and more.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border-b-0">
                            <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                                How is AI used in AnnotatorAI?
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-muted-foreground">
                                AI is used to help create summaries using the 
                                text you provide to help you save time.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FAQ;
