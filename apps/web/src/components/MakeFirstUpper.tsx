import React from "react";
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

export function MakeFirstUpper() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);
  const maintextColor = useFileStore((state) => state.maintextColor);

  function toggleFirsttUpper() {
    // This RegEx matches every first letter in a string if it is lowercase
    const lowerCaseLetters = content.match(/\b[a-z]/g);

    let newContent: string;
    if (lowerCaseLetters) {
      newContent = content.replace(/\b[a-z]/gi, (letter) =>
        letter.toUpperCase(),
      );
    } else {
      newContent = content.replace(/\b[a-z]/gi, (letter) =>
        letter.toLowerCase(),
      );
    }

    setContent(newContent);
  }

  return (
    <button
    className="tooltip-container "
      onClick={toggleFirsttUpper}
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
      First Upper
      <div className="tooltip-text" style={{backgroundColor: "#1317f9c9", color: "white", zIndex:'50', position:"absolute"}}>Toggle first letter of each word to uppercase/lowercase</div>
    </button>
  );
};
