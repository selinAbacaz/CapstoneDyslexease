import { DragEvent } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;


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
  async function extractText(file: File): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase();

    switch (ext) {
      case "txt":
        return readAsText(file);
      case "pdf":
        return readPdf(file);
      case "docx":
        return readDocx(file);
      default:
        return Promise.resolve("Unsupported file type\n");
    }
  }

  // TXT file reader
  function readAsText(file: File): Promise<string> {
    return new Promise ((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(file);
    });
  }

  // PDF file reader
  async function readPdf(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ') + '\n';
    }
    return text;
  }

  // DOCX file reader
  async function readDocx(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    props.setIsDragOver(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    props.setIsDragOver(false);
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    props.setIsDragOver(false);

    const userFiles = Array.from(event.dataTransfer.files);
    props.setFile(userFiles);

    let accumWords = '';

    for (const file of userFiles) {
      const extracted = await extractText(file);
      accumWords += extracted + '\n';
    }
    props.setWords(accumWords);


    /* userFiles.forEach((file: File) => {
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
    }); */
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
