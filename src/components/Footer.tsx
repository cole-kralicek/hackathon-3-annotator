import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-row w-full items-center justify-between font-semibold bg-primary text-accent text-center py-4 px-10">
            <p>&copy; 2024 . All rights reserved.</p>
            <p>
                Made by{" "}
                <span className="underline">
                    <Link
                        href="https://www.linkedin.com/in/yash-patki-b17336164/"
                        target="_blank"
                    >
                        Yash
                    </Link>
                </span>
                ,{" "}
                <span className="underline">
                    <Link
                        href=""
                        target="_blank"
                    >
                        ---
                    </Link>
                </span>
                ,{" "}
                <span className="underline">
                    <Link
                        href=""
                        target="_blank"
                    >
                        ---
                    </Link>
                </span>
                ,{" "}
                <span className="underline">
                    <Link
                        href=""
                        target="_blank"
                    >
                        ---
                    </Link>
                </span>
            </p>
        </footer>
    );
};

export default Footer;
