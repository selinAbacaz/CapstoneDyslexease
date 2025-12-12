import { FormControl, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { useFileStore } from '../utils/zustand/file-store';

export function ChangeFontSize() {
  const fontSize = useFileStore((state) => state.fontSize);
  const setFontSize = useFileStore((state) => state.setFontSize);

  return (
    <div style={{ display: 'flex' }}>
      <InputGroup>
        <InputGroupText>Font Size</InputGroupText>
        <FormControl
          placeholder="Font Size"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </InputGroup>
    </div>
  );
}
