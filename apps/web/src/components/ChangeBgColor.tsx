import { useFileStore } from '../utils/zustand/file-store';

export function ChangeBgColor() {
  const setBackgroundColor = useFileStore((state) => state.setBackgroundColor);

  return (
    <div>
      <label
        htmlFor="bg-color-picker"
        style={{ display: 'block', fontSize: '18px', color: '#4a6cc7' }}
      >
        Background Color
      </label>
      <input
        id="bg-color-picker"
        defaultValue="#FFFFFF"
        type="color"
        onChange={(e) => setBackgroundColor(e.target.value)}
      />
    </div>
  );
}
