import React from "react";
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

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
      className="tooltip-container "
      onClick={removeLine}
      disabled={!content}
      style={{
        pointerEvents: 'auto',
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "13px",
        padding: "4px 8px",
        borderRadius: "4px",
      }}
    >
      Remove Line
      <div className="tooltip-text" style={{backgroundColor: "#1317f9c9", color: "white", zIndex:'50', position:"absolute"}}>Remove all new lines</div>
    </button>
  );
};
