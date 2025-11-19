import { Button } from 'react-bootstrap';
import { useFileStore } from '../zustand/file-store';

export function AddNewLine() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

  function addLine() {
    const sentences = content.split('.');
    const newLines = sentences
      .map((senetence) => {
        if (senetence !== '\n' && senetence !== '') {
          return senetence + '.\n';
        }
      })
      .join('');
    setContent(newLines);
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
