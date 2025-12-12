import { useState } from 'react';
import { useFileStore } from '../utils/zustand/file-store';
import { SwapPair } from '../utils/types/swap-pair';

const LetterSwapControl = () => {
  const { swapPairs, addSwapPair, removeSwapPair } = useFileStore();
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  const handleAdd = () => {
    if (first && second && first !== second) {
      addSwapPair([first[0], second[0]]);
      setFirst('');
      setSecond('');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '10px',
        background: '#fafafa',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        width: '160px'
      }}
    >
      <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>
        Swap Letters
      </label>

      {/* Input Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <input
          style={{
            width: '32px',
            height: '28px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '14px',
          }}
          value={first}
          maxLength={1}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="b"
        />

        <span style={{ fontSize: '14px', opacity: 0.7 }}>↔</span>

        <input
          style={{
            width: '32px',
            height: '28px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '14px',
          }}
          value={second}
          maxLength={1}
          onChange={(e) => setSecond(e.target.value)}
          placeholder="d"
        />

        <button
          onClick={handleAdd}
          disabled={!first || !second}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            background: (!first || !second) ? '#f2f2f2' : '#ffffff',
            cursor: (!first || !second) ? 'not-allowed' : 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          Add
        </button>
      </div>

      {/* Swap List */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        {swapPairs.map((pair: SwapPair, idx: number) => (
          <span
            key={idx}
            style={{
              background: '#e9e9e9',
              padding: '3px 6px',
              borderRadius: '6px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {pair[0]}↔{pair[1]}
            <button
              onClick={() => removeSwapPair(idx)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#d33',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LetterSwapControl;
