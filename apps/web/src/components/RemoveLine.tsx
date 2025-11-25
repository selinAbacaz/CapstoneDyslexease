import { Button } from 'react-bootstrap';
import { useFileStore } from '../zustand/file-store';

export function RemoveLine() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

  function removeLine() {
    const sentences = content.split('.\n');
    const newLines = sentences.join('.');
    setContent(newLines);
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
