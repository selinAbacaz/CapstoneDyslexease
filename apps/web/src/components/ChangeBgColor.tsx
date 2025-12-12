import React from "react";
import { useFileStore } from '../utils/zustand/file-store';

export const ChangeBgColor = () => {
  const setBackgroundColor = useFileStore((s) => s.setBackgroundColor);
  const setMainTextColor = useFileStore((s) => s.setMainTextColor);

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    const r = parseInt(newColor.slice(1, 3), 16);
    const g = parseInt(newColor.slice(3, 5), 16);
    const b = parseInt(newColor.slice(5, 7), 16);

    const total = r + g + b;

    setMainTextColor(total > 350 ? "black" : "white");
    setBackgroundColor(newColor);
  };

  return (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontSize: 12, marginBottom: 4 }}>Background Color</label>

    <input
      type="color"
      defaultValue="#FFFFFF"
      onChange={changeColor}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        width: "30px",
        height: "24px",
        padding: 0,
      }}
    />
  </div>
);

};
