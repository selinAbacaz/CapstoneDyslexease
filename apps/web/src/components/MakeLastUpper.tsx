import { Button } from 'react-bootstrap';
import { useFileStore } from '../zustand/file-store';

export function MakeLastUpper() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

  function toggleLastUpper() {
    const newContent = content.replace(/[a-z](?=$|[\s.!?])/g, (letter) =>
      letter.toUpperCase(),
    );
    setContent(newContent);
  }

  return (
    <div>
      <Button
        onClick={toggleLastUpper}
        disabled={content === ''}
        style={{
          boxShadow: '2px 2px 10px #99aee7',
        }}
      >
        Make Last Uppercase
      </Button>
    </div>
  );
}
