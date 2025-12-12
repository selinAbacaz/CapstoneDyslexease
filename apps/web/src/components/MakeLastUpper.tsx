import React from "react";
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

export function MakeLastUpper() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);
  const maintextColor = useFileStore((state) => state.maintextColor);

  function toggleLastUpper() {
    // This RegEx matches every last letter in a string if it is lowercase
    const lowerCaseLetters = content.match(/[a-z](?=$|[\s.!?])/g);

    let newContent: string;
    if (lowerCaseLetters) {
      newContent = content.replace(/[a-z](?=$|[\s.!?])/gi, (letter) =>
        letter.toUpperCase(),
      );
    } else {
      newContent = content.replace(/[a-z](?=$|[\s.!?])/gi, (letter) =>
        letter.toLowerCase(),
      );
    }

    setContent(newContent);
  }

  return (
    <button
    className="tooltip-container "
      onClick={toggleLastUpper}
      disabled={!content}
      style={{
        pointerEvents: 'auto',
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "13px",
        padding: "4px 8px",
        borderRadius: "4px",
        color: maintextColor,
      }}
    >
      Last Upper
      <div className="tooltip-text" style={{backgroundColor: "#1317f9c9", color: "white", zIndex:'50', position:"absolute"}}>Toggle last letter of each word to uppercase/lowercase</div>
    </button>
  );
};
