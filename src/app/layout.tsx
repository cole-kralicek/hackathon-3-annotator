import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

import { LTRemarkRegular } from "../../styles/fonts";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/app/globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className={inter.className}>
                    <Nav />
                    {children}
                    <Footer />
                </body>
            </ClerkProvider>
        </html>
    );
}
