import { DragEvent, useState } from 'react';
import { useFileStore } from '../zustand/file-store';

export function DropFile() {
  const [isFileOver, setIsFileOver] = useState<boolean>(false);
  const setContent = useFileStore((state) => state.setContent);

  function handleDragOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsFileOver(true);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsFileOver(false);

    const userFiles = Array.from(event.dataTransfer.files);

    userFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setContent(reader.result);
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
          backgroundColor: isFileOver ? 'gray' : 'white',
          color: 'black',
          boxShadow: '2px 2px 10px #99aee7',
        }}
      >
        Drag files
      </div>
    </div>
  );
}
