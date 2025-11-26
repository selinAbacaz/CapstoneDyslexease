import { useFileStore } from '../utils/zustand/file-store';

export function LetterSpacing() {
  const letterSpacing = useFileStore((state) => state.letterSpacing);
  const setLetterSpacing = useFileStore((state) => state.setLetterSpacing);

  function changeSpacing(event: React.ChangeEvent<HTMLInputElement>) {
    const newSpacing = Number(event.target.value);
    if (newSpacing || newSpacing === 0) {
      setLetterSpacing(newSpacing);
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
        value={letterSpacing}
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
