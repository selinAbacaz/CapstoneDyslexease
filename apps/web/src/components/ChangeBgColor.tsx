import { useFileStore } from '../utils/zustand/file-store';

export function ChangeBgColor() {
  const setBackgroundColor = useFileStore((state) => state.setBackgroundColor);
  const setMainTextColor = useFileStore((state) => state.setMainTextColor);

  function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    const newColor = e.target.value;
    const r = parseInt(newColor.slice(1, 3), 16);
    const g = parseInt(newColor.slice(3, 5), 16);
    const b = parseInt(newColor.slice(5, 7), 16);
    const total = r + g + b;

    if (total > 350) {
      setMainTextColor('black');
    } else {
      setMainTextColor('white');
    }

    setBackgroundColor(newColor);
  }

  return (
    <div>
      <label
        htmlFor="bg-color-picker"
        style={{ display: 'block', fontSize: '18px' }}
      >
        Background Color
      </label>
      <input
        id="bg-color-picker"
        defaultValue="#FFFFFF"
        type="color"
        onChange={(e) => changeColor(e)}
      />
    </div>
  );
}
