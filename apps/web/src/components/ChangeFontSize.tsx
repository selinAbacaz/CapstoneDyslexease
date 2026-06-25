import { FormControl, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { useFileStore } from '../utils/zustand/file-store';
import '../App.css'

export function ChangeFontSize() {
  const fontSize = useFileStore((state) => state.fontSize);
  const setFontSize = useFileStore((state) => state.setFontSize);

  return (
    <div className="tooltip-container " style={{ display: 'flex', pointerEvents: 'auto' }}>
      <InputGroup>
        <InputGroupText>Font Size</InputGroupText>
        <FormControl
          placeholder="Font Size"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </InputGroup>
      <div className="tooltip-text" style={{zIndex: '50', position: "absolute", backgroundColor: "#1317f9c9", color: "white", top: '100%', left: 0, marginTop: '8px', minHeight: "40px", transform: "scaleY(-1)"}}> <div style={{transform: "scaleY(-1)"}}> Change Font Size </div> </div>
    </div>
  );
}
