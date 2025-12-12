import React from "react";
import { useFileStore } from '../utils/zustand/file-store';

export function RemoveLine() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

  function removeLine() {
    // RegEx to split on punctions but retain them in the actual string
    const lines = content.split(/(?<=[.?!])/g);
    const newLines: string[] = [];
    for (const line of lines) {
      const newLine = line.replace('\n', '');
      newLines.push(newLine);
    }

    setContent(newLines.join(''));
  }

  return (
    <button
      onClick={removeLine}
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
      Remove Line
    </button>
  );
};
