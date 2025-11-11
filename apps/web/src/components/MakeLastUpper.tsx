import { useState } from "react";
import { DropFilesProps } from "./FileDragger";
import { Button } from "react-bootstrap";


export function MakeLastUpper (props: DropFilesProps) {
    const [isLastUpper, setIsLastUpper] = useState<boolean>(false)

    function changeText (): void {
        if (!isLastUpper) {
            const sentences: string[] = props.words.split(".\n");
            const modifiedText = sentences.map((sentence: string): string => changeWord(sentence)).join(".\n");
            props.setWords(modifiedText);
            setIsLastUpper(true);
        }
        else {
            const sentences: string[] = props.words.split(".\n");
            const modifiedText = sentences.map((sentence: string): string => changeWord(sentence)).join(".\n");
            props.setWords(modifiedText);
            setIsLastUpper(false);
        }

        
    }

    function changeWord (sentence: string): string {
        const words: string[] = sentence.split(" ");
        if (!isLastUpper) {
            return words.map((word: string): string => `${word.slice(0, word.length - 1)}${word.charAt(word.length - 1).toUpperCase()}`).join(" ");
        }
        return words.map((word: string): string => `${word.slice(0, word.length - 1)}${word.charAt(word.length - 1).toLowerCase()}`).join(" ");
    }

    return (<div><Button onClick={changeText} disabled={props.words === ""}>Make Last Uppercase</Button></div>)
}