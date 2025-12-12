import React from "react";
import { useFileStore } from '../utils/zustand/file-store';

export const LetterSpacing = () => {
  const letterSpacing = useFileStore((s) => s.letterSpacing);
  const setLetterSpacing = useFileStore((s) => s.setLetterSpacing);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
    </div>
  );
};
