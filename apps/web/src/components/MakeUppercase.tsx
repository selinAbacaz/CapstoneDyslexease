import { useState } from "react";
import { DropFilesProps } from "./FileDragger";
import { Button } from "react-bootstrap";


export function MakeUppercase (props: DropFilesProps) {
    const [isChanged, setIsChanged] = useState<boolean>(false)

    function changeText (): void {
        if (!isChanged) {
            const sentences: string[] = props.words.split(".\n");
            const modifiedText = sentences.map((sentence: string): string => changeWord(sentence)).join(".\n");
            props.setWords(modifiedText);
            setIsChanged(true);
        }
        else {
            const sentences: string[] = props.words.split(".\n");
            const modifiedText = sentences.map((sentence: string): string => changeWord(sentence)).join(".\n");
            props.setWords(modifiedText);
            setIsChanged(false);
        }

        
    }

    function changeWord (sentence: string): string {
        const words: string[] = sentence.split(" ");
        if (!isChanged) {
            return words.map((word: string): string => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
        }
        return words.map((word: string): string => `${sentence.indexOf(word) !== 0 ? word.charAt(0).toLowerCase() : word.charAt(0)}${word.slice(1)}`).join(" ");
    }

    return (<div><Button onClick={changeText} disabled={props.words === ""}>Make Uppercase</Button></div>)
}