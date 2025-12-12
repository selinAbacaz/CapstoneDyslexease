import React from "react";
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

export const LetterSpacing = () => {
  const letterSpacing = useFileStore((s) => s.letterSpacing);
  const setLetterSpacing = useFileStore((s) => s.setLetterSpacing);

  return (
    <div className= "tooltip-container" style={{ pointerEvents: 'auto', display: "flex", flexDirection: "column" }}>
    <label style={{ fontSize: 12, marginBottom: 4 }}>Letter Spacing</label>

    <input
      type="number"
      value={letterSpacing}
      onChange={(e) => setLetterSpacing(Number(e.target.value))}
      style={{
        width: "50px",
        background: "transparent",
        fontSize: "14px",
        border: "1px solid #ccc",
      }}
    />
    <div className="tooltip-text " style={{backgroundColor: "#1317f9c9", color: "white", zIndex:'50', position:"absolute"}}> Change Letter Spacing </div>
    </div>
  );
};
