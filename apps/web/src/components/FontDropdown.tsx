import { JSX } from 'react';
import { FONTS } from '../utils/constants';
import { useFileStore } from '../utils/zustand/file-store';

export function FontDropdown() {
  const setFont = useFileStore((state) => state.setFont);

  function createFontOptions() {
    const options: JSX.Element[] = [];

    let font: keyof typeof FONTS;
    for (font in FONTS) {
      const newFont = FONTS[font];
      const newOption = (
        <li
          key={newFont.font}
          onClick={() => setFont(newFont.font)}
          className="dropdown-item"
          style={{
            cursor: 'pointer',
            fontSize: '13px',
            padding: '8px 12px',
          }}
        >
          {newFont.name}
        </li>
      );
      options.push(newOption);
    }

    return options;
  }

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          background: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '13px',
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        Pick Font
      </button>

      <ul
        className="dropdown-menu"
        style={{
          borderRadius: '8px',
          border: '1px solid #ddd',
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
          padding: '6px 0',
        }}
      >
        {createFontOptions()}
      </ul>
    </div>
  );
}
