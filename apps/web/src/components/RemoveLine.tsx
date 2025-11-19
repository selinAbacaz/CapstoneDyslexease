import { Button } from 'react-bootstrap';
import { DropFilesProps } from './FileDragger';

export function RemoveLine(props: DropFilesProps) {
  function removeLine() {
    const sentences = props.words.split('.\n');
    const newLines = sentences.join('.');
    props.setWords(newLines);
  }

  return (
    <Button onClick={removeLine} disabled={props.words === ''} style={{fontFamily: props.fontFamily, boxShadow: '2px 2px 10px #99aee7'}}>
      Remove a Line
    </Button>
  );
}
