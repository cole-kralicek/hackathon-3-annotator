import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-row h-20 w-full items-center justify-between font-light border-t border-primary text-center py-4 px-10">
            <p>&copy; 2024 . All rights reserved.</p>
            <p>
                Made by{" "}
                <span className="underline">
                    <Link
                        href="https://www.linkedin.com/in/karla-itzel-zamora/"
                        target="_blank"
                    >
                        Karla
                    </Link>
                </span>
                ,{" "}
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
                        href="https://www.linkedin.com/in/srahman02/"
                        target="_blank"
                    >
                        Sohan
                    </Link>
                </span>
                ,{" "}
                <span className="underline">
                    <Link
                        href="https://www.linkedin.com/in/cole-kralicek/"
                        target="_blank"
                    >
                        Cole
                    </Link>
                </span>
            </p>
        </footer>
    );
};

export default Footer;
