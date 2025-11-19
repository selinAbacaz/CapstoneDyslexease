import { DragEvent } from 'react';

export interface DropFilesProps {
  isDragOver: boolean;
  setIsDragOver: (newIsDragOver: boolean) => void;
  file: File[];
  setFile: (newFile: File[]) => void;
  words: string;
  setWords: (newWords: string) => void;
  fontFamily: string;
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

    userFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          props.setWords(reader.result);
        }
      };

      reader.onerror = () => {
        console.error('There was an issue.');
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
          margin: 'auto',
          marginTop: '10vh',
          marginBottom: '10vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          minWidth: '100vh',
          border: '1px dotted',
          backgroundColor: props.isDragOver ? 'lightgray' : 'white',
          color: 'black',
          fontFamily: props.fontFamily,
          boxShadow: '2px 2px 10px #99aee7',
        }}
      >
        Drag files
      </div>
    </div>
  );
}
