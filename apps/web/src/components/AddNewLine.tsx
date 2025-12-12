import React from "react";
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

export const AddNewLine = () => {
  const content = useFileStore((s) => s.content);
  const setContent = useFileStore((s) => s.setContent);
    const maintextColor = useFileStore((state) => state.maintextColor);

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
        pointerEvents: 'auto',
        color: maintextColor,
        
      }}
    >
      Add Line
      <div className="tooltip-text" style={{backgroundColor: "#1317f9c9", color: "white", zIndex:'50', position:"absolute"}}>Add new line after every line</div>
    </button>
  );
};
