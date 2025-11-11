import { Button } from "react-bootstrap";
import { DropFilesProps } from "./FileDragger";

export function RemoveLine (props: DropFilesProps) {

    function removeLine () {
        const sentences = props.words.split(".\n");
        const newLines = sentences.join(".");
        props.setWords(newLines);
        
    }

    return <Button onClick={removeLine} disabled={props.words === ""}>Remove a Line</Button>
}