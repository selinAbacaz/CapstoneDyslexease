import React from "react";
import { useFileStore } from '../utils/zustand/file-store';

export function MakeFirstUpper() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

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
      onClick={toggleFirsttUpper}
      disabled={!content}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "13px",
        padding: "4px 8px",
        borderRadius: "4px",
      }}
    >
      First Upper
    </button>
  );
};
