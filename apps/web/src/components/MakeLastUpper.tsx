import { Button } from 'react-bootstrap';
import { useFileStore } from '../zustand/file-store';

export function MakeLastUpper() {
  const content = useFileStore((state) => state.content);
  const setContent = useFileStore((state) => state.setContent);

  function toggleLastUpper() {
    // This RegEx matches every last letter in a string if it is lowercase
    const lowerCaseLetters = content.match(/[a-z](?=$|[\s.!?])/g);

    let newContent: string;
    if (lowerCaseLetters) {
      newContent = content.replace(/[a-z](?=$|[\s.!?])/gi, (letter) =>
        letter.toUpperCase(),
      );
    } else {
      newContent = content.replace(/[a-z](?=$|[\s.!?])/gi, (letter) =>
        letter.toLowerCase(),
      );
    }

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
        Toggle Last Letters
      </Button>
    </div>
  );
}
