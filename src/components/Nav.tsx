"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageSquareDiff, Menu, LucideLogOut } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Nav = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
    });

    return (
        <header className="flex flex-row w-full items-center justify-between px-4 sm:px-12 py-4 shadow-md">
            <Link href="/" className="flex flex-row gap-2 items-center">
                <MessageSquareDiff
                    size={24}
                    strokeWidth={3}
                    className="font-bold text-primary"
                />
                <h1 className="text-2xl font-bold">AnnotatorAI</h1>
            </Link>
            <nav className="hidden items-center gap-8 space-x-4 sm:flex">
                <SignedOut>
                    <Button className="text-md">
                        <SignInButton />
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </nav>
            <div className="flex items-center sm:hidden">
                <SignedOut>
                    <Button className="text-md">
                        <SignInButton />
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </header>
    );
};

export default Nav;
