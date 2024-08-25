"use client";
import { useEffect, useState } from "react";
import Generate from "@/components/Generate";
import ManualEntry from "@/components/ManualEntry";
import UploadFile from "@/components/UploadFile";
import { cn } from "@/lib/utils";

const UploadPage = () => {
    const [selected, setSelected] = useState("upload");

    const tabs = [
        // { id: "manual", label: "Manual Entry" },
        // { id: "aigen", label: "AI Generated" },
        { id: "upload", label: "Upload File" },
    ];

    return (
        <section className="container relative flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen">
            <h2 className="text-2xl font-semibold">
                Create a New Transcript
            </h2>
            <div className="w-full flex flex-row gap-6 flex-wrap md:gap-14">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={cn(
                            "cursor-pointer pb-2",
                            selected === tab.id
                                ? "font-semibold border-b-2 border-primary"
                                : "text-muted-foreground"
                        )}
                        onClick={() => setSelected(tab.id)}
                    >
                        <h3 className="text-md">{tab.label}</h3>
                    </div>
                ))}
            </div>
            {selected === "manual" && <ManualEntry />}
            {selected === "aigen" && <Generate />}
            {selected === "upload" && <UploadFile />}
        </section>
    );
};

export default UploadPage;
