import { LTRemarkRegular, LTRemarkItalic, LTRemarkBold } from "../../styles/fonts";

import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <div>
        <Header/>
        <p className={LTRemarkRegular.className}>Hello, World!</p>
        <p className={LTRemarkItalic.className}>Hello, World!</p>
        <p className={LTRemarkBold.className}>Hello, World!</p>
      </div>
    </main>
  );
}
