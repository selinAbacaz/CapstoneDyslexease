export function ChangeBgColor() {
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
        type="color"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}
