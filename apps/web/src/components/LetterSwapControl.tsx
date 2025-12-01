import { useState } from 'react';
import { useFileStore, SwapPair } from '../utils/zustand/file-store';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', border: '1px solid #ccc', padding: '5px', borderRadius: '5px' }}>
      <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Swap Letters</label>
      
      {/* Input Area */}
      <div style={{ display: 'flex', gap: '5px' }}>
        <input 
          style={{ width: '30px', textAlign: 'center' }} 
          value={first} 
          maxLength={1}
          onChange={(e) => setFirst(e.target.value)} 
          placeholder="b"
        />
        <span>↔</span>
        <input 
          style={{ width: '30px', textAlign: 'center' }} 
          value={second} 
          maxLength={1}
          onChange={(e) => setSecond(e.target.value)} 
          placeholder="d"
        />
        <button onClick={handleAdd} disabled={!first || !second} style={{ fontSize: '12px' }}>Add</button>
      </div>

      {/* Active Swaps List */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '150px' }}>
        {swapPairs.map((pair: SwapPair, idx: number) => (
          <span key={idx} style={{ background: '#eee', padding: '2px 5px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
            {pair[0]}↔{pair[1]}
            <button 
              onClick={() => removeSwapPair(idx)}
              style={{ border: 'none', background: 'none', marginLeft: '2px', cursor: 'pointer', color: 'red', fontWeight: 'bold' }}
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