"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { NotepadTextDashed, Menu, LucideLogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Nav = () => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);   
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
    });


    return (
        <header className="flex flex-row w-full items-center justify-between px-4 sm:px-12 py-4 shadow-md">
            <Link href="/" className="flex flex-row gap-2 items-center">
                <NotepadTextDashed
                    size={24}
                    strokeWidth={3}
                    className="font-bold text-primary"
                />
                <h1 className="text-2xl font-bold">CardGenAI</h1>
            </Link>
            <nav className="hidden items-center gap-8 space-x-4 sm:flex">
                {currentUser && (
                    <Link href="/flashcards" className="text-md font-semibold">
                        My Decks
                    </Link>
                )}

                {currentUser === null ? (
                    <Link href="/login">
                        <Button className="text-md">Get Started</Button>
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="" alt="@shadcn" />
                                <AvatarFallback>
                                    {userData?.firstName[0] +
                                        userData?.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="bottom"
                            sideOffset={12}
                            align="end"
                            className="w-[200px]"
                        >
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.push("/profile")}
                            >
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => router.push("/pricing")}
                            >
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LucideLogOut size={15} className="mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </nav>
            <div className="flex items-center sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Menu />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="bottom"
                        sideOffset={12}
                        align="end"
                        className="w-[200px]"
                    >
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {currentUser && (
                            <DropdownMenuItem>
                                <Link href="/cards">
                                    <Button className="text-md">
                                        My Decks
                                    </Button>
                                </Link>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {currentUser === null ? (
                                <Link href="/login">
                                    <Button className="text-md">
                                        Get Started
                                    </Button>
                                </Link>
                            ) : (
                                <h3>Logout</h3>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Nav;
