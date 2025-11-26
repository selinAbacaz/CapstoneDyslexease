import { Button } from 'react-bootstrap';
import { useFileStore } from '../zustand/file-store';

export function AddNewLine() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

  function addLine() {
    // RegEx to split on punctions but retain them in the actual string
    const newContent = content.split(/(?<=[.?!])/g).join('\n');
    setContent(newContent);
  }

  return (
    <Button
      style={{
        boxShadow: '2px 2px 10px #99aee7',
      }}
      onClick={addLine}
      disabled={content === ''}
    >
      Add a new Line
    </Button>
  );
}
