import React from "react";
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

export const AddNewLine = () => {
  const content = useFileStore((s) => s.content);
  const setContent = useFileStore((s) => s.setContent);

  const addLine = () => {
    setContent(content.split(/(?<=[.?!])/g).join("\n"));
  };

  return (
    <button
    className="tooltip-container "
      onClick={addLine}
      disabled={!content}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "13px",
        padding: "4px 8px",
        borderRadius: "4px",
        pointerEvents: 'auto'
      }}
    >
      Add Line
      <div className="tooltip-text">Add new line after every line</div>
    </button>
  );
};
