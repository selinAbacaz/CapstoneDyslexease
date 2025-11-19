import { Button } from 'react-bootstrap';
import { DropFilesProps } from './FileDragger';
import '../App.css';

//very interesting

export function AddNewLine(props: DropFilesProps) {
  function addLine() {
    const sentences = props.words.split('.');
    const newLines = sentences
      .map((senetence) => {
        if (senetence !== '\n' && senetence !== '') {
          return senetence + '.\n';
        }
      })
      .join('');
    props.setWords(newLines);
  }

  return (
    <Button className="tooltip-container "
      style={{
        fontFamily: props.fontFamily,
        boxShadow: '2px 2px 10px #99aee7',
        pointerEvents: 'auto'
      }}
      onClick={addLine}
      disabled={props.words === ''}
    >
      Add a new Line
      <div className="tooltip-text ">Add new line after every line</div>

    </Button>
  );
}
