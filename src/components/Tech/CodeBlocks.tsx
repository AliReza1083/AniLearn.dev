import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import confetti from "canvas-confetti";

type Props = {
  codeString: string;
  language: string;
  fileName: string;
};

// Icons
import { MdContentCopy } from "react-icons/md";
import { BsFillClipboard2CheckFill } from "react-icons/bs";

export default function CodeBlocks({ codeString, language, fileName }: Props) {
  const [isSaved, setIsSaved] = useState<[string, boolean]>(["Copy", false]);

  const copyFunction = () => {
    navigator.clipboard.writeText(codeString);
    setIsSaved(["Copied", true]);
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });

    setTimeout(() => {
      setIsSaved(["Copy", false]);
    }, 3000);
  };

  return (
    <div className="w-full my-8 border-2 rounded-lg bg-box border-white-low-opacity max-w-input">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white-low-opacity">
        <p>{fileName}</p>
        <div
          className="flex items-center gap-1 text-sm cursor-pointer"
          onClick={copyFunction}
        >
          {isSaved[1] ? (
            <span>
              <BsFillClipboard2CheckFill />
            </span>
          ) : (
            <span>
              <MdContentCopy />
            </span>
          )}
          <span>{isSaved[0]}</span>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={tomorrowNight}
        customStyle={{
          background: "none",
          paddingInline: "1em",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}