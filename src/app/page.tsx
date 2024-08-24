import {
    LTRemarkRegular,
    LTRemarkItalic,
    LTRemarkBold,
} from "../../styles/fonts";

import Header from "@/components/Header";

export default function Home() {
    return (
        <main>
            <div>
                <Header />
                <p className={LTRemarkRegular.className}>Hello, World!</p>
                <p className={LTRemarkItalic.className}>Hello, World!</p>
                <p className={LTRemarkBold.className}>Hello, World!</p>
            </div>
            <div className="flex flex-col items-center justify-center min-w-screen min-h-screen bg-slate-500">
                <h1 className="text-6xl font-bold text-center">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
                <p className="mt-3 text-2xl">
                    Get started by editing{" "}
                    <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                        pages/index.js
                    </code>
                </p>
            </div>
        </main>
    );
}
