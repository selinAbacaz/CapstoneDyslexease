import React from "react";
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

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
  <div className= "tooltip-container" style={{ display: "flex",pointerEvents: 'auto', flexDirection: "column" }}>
    <label style={{ fontSize: 12, marginBottom: 4 }}>Background Color</label>

    <input
      type="color"
      defaultValue="#FFFFFF"
      onChange={changeColor}
      style={{
        border: "1px solid #ccc",
        background: "transparent",
        cursor: "pointer",
        width: "30px",
        height: "24px",
        padding: 0,
        borderColor: "white",
      }}
    />
    <div className="tooltip-text " style={{backgroundColor: "#1317f9c9", color: "white", zIndex:'50', position:"absolute"}}> Change background Color </div>
  </div>
);

};
