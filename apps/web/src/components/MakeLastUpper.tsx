import React from "react";
import { useFileStore } from '../utils/zustand/file-store';

export function MakeLastUpper() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

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
      onClick={toggleLastUpper}
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
      Last Upper
    </button>
  );
};
