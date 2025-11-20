import { Button } from 'react-bootstrap';
import { DropFilesProps } from './FileDragger';

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
    <Button
      style={{
        fontFamily: props.fontFamily,
        boxShadow: '2px 2px 10px #99aee7',
      }}
      onClick={addLine}
      disabled={props.words === ''}
    >
      Add a new Line
    </Button>
  );
}
