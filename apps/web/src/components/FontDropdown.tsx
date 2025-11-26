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
          style={{ cursor: 'pointer' }}
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
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ boxShadow: '2px 2px 10px #99aee7' }}
      >
        Pick Fonts
      </button>
      <ul className="dropdown-menu">
        {createFontOptions().map((option) => option)}
      </ul>
    </div>
  );
}
