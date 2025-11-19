import { Button } from 'react-bootstrap';
import { DropFilesProps } from './FileDragger';
import '../App.css';

export function RemoveLine(props: DropFilesProps) {
  function removeLine() {
    const sentences = props.words.split('.\n');
    const newLines = sentences.join('.');
    props.setWords(newLines);
  }

  return (
    <Button className="tooltip-container" onClick={removeLine} disabled={props.words === ''} style={{fontFamily: props.fontFamily, boxShadow: '2px 2px 10px #99aee7', pointerEvents: 'auto'}}>
      Remove a Line
      <div className="tooltip-text ">remove added new lines </div>


    </Button>
  );
}
