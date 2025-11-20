import { useState } from 'react';

export function LetterSpacing() {
  const [spacing, setSpacing] = useState<number>(0);

  function changeSpacing(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    if (input.trim() === '') {
      setSpacing(0);
    } else {
      const newSpacing = parseInt(event.target.value);
      setSpacing(newSpacing);
      const wordsElement = document.getElementById('changeText11');
      if (wordsElement) {
        wordsElement.style.letterSpacing = `${newSpacing}px`;
      }
    }
  }

  return (
    <div>
      <label htmlFor="Spacing" style={{ fontSize: '18px', color: '#4a6cc7' }}>
        Change Letter Spacing:
      </label>
      <input
        id="Spacing"
        name="Change Letter Spacing"
        min={10}
        max={100}
        value={spacing}
        onChange={changeSpacing}
        style={{
          color: '#4a6cc7',
          border: '1.5px solid #4a6cc7',
          borderRadius: '5px',
          marginLeft: '10px',
        }}
      />
    </div>
  );
}
