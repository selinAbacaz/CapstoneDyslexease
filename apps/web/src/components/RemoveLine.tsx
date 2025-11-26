import { Button } from 'react-bootstrap';
import { useFileStore } from '../utils/zustand/file-store';

export function RemoveLine() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

  function removeLine() {
    // RegEx to split on punctions but retain them in the actual string
    const lines = content.split(/(?<=[.?!])/g);
    const newLines: string[] = [];
    for (const line of lines) {
      const newLine = line.replace('\n', '');
      newLines.push(newLine);
    }

    setContent(newLines.join(''));
  }

  return (
    <Button
      onClick={removeLine}
      disabled={content === ''}
      style={{
        boxShadow: '2px 2px 10px #99aee7',
      }}
    >
      Remove a Line
    </Button>
  );
}
