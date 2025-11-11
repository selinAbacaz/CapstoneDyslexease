import { DragEvent} from "react"; 

export interface DropFilesProps {
  isDragOver: boolean;
  setIsDragOver: (newIsDragOver: boolean) => void;
  file: File[];
  setFile: (newFile: File[]) => void;
  words: string;
  setWords: (newWords: string) => void;
}

export function DropFile(props: DropFilesProps) {

  function handleDragOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    props.setIsDragOver(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    props.setIsDragOver(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    props.setIsDragOver(false);

    const userFiles = Array.from(event.dataTransfer.files);
    props.setFile(userFiles);

    let accumWords: string = "";

    userFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const removedLineBreaks = reader.result.replace(/[\r\n]+/gm, " ");
          accumWords += removedLineBreaks.split(".").join(".\n");
          props.setWords(accumWords);
        }
      };

      reader.onerror = () => {
        console.error("There was an issue.");
      };

      reader.readAsText(file);
      return reader;
    });
  }

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          width: "300px",
          border: "1px dotted",
          backgroundColor: props.isDragOver ? "lightgray" : "white",
          color: "black",
        }}
      >
        Drag files
      </div>
    </div>
  );
}