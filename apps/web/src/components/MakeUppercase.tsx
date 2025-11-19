import { useState } from 'react';
import { DropFilesProps } from './FileDragger';
import { Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export function MakeUppercase(props: DropFilesProps) {
  const [isChanged, setIsChanged] = useState<boolean>(false);

  function changeText(): void {
    if (!isChanged) {
      const sentences: string[] = props.words.split('.\n');
      const modifiedText = sentences
        .map((sentence: string): string => changeWord(sentence))
        .join('.\n');
      props.setWords(modifiedText);
      setIsChanged(true);
    } else {
      const sentences: string[] = props.words.split('.\n');
      const modifiedText = sentences
        .map((sentence: string): string => changeWord(sentence))
        .join('.\n');
      props.setWords(modifiedText);
      setIsChanged(false);
    }
  }

  function changeWord(sentence: string): string {
    const words: string[] = sentence.split(' ');
    if (!isChanged) {
      return words
        .map(
          (word: string): string =>
            `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
        )
        .join(' ');
    }
    return words
      .map(
        (word: string): string =>
          `${sentence.indexOf(word) !== 0 ? word.charAt(0).toLowerCase() : word.charAt(0)}${word.slice(1)}`,
      )
      .join(' ');
  }

  return (
    <div>
      <Button className="tooltip-container" onClick={changeText} disabled={props.words === ''} style={{fontFamily: props.fontFamily, boxShadow: '2px 2px 10px #99aee7', pointerEvents: 'auto'}}>
        Make Uppercase
        <div className="tooltip-text ">Make first letter of each word uppercase</div>

      </Button>
    </div>
  );
}
