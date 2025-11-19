import { useEffect, useState } from 'react';
import './App.css';
import { DropFile } from './components/FileDragger';
import { MakeUppercase } from './components/MakeUppercase';
import { MakeLastUpper } from './components/MakeLastUpper';
import { LetterSpacing } from './components/LetterSpacing';
import { AddNewLine } from './components/AddNewLine';
import { RemoveLine } from './components/RemoveLine';
import { Navbar } from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";



function App() {

  const ArialFont= 'Arial, sans-serif';
  const TimesNewRomanFont= 'Times New Roman, serif';
  const HelveticaFont= 'Helvetica, sans-serif';
  const SegoeUIFont= 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';

  const [isDragOver, setisDragOver] = useState<boolean>(false);
  const [file, setFile] = useState<File[]>([]);
  const [words, setWords] = useState<string>('');
  const [fontFamily, changeFont] = useState<string>(ArialFont);


  
  return (
    <div className="App" id="container" style={{ fontFamily: fontFamily }}>
    <Navbar></Navbar>

    
  <div style={{display: 'flex', gap: '10px', marginTop: '5vh', justifyContent: 'center'}}>

  <div className="dropdown" >
  <button className="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{boxShadow: '2px 2px 10px #99aee7'}}> 
    Pick Fonts
  </button>
    <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#one" onClick={() => changeFont(TimesNewRomanFont)} >Times new Roman </a></li>
        <li><a className="dropdown-item" href="#two" onClick={() => changeFont(HelveticaFont)}>Helvetica</a></li>
        <li><a className="dropdown-item" href="#three" onClick={() => changeFont(SegoeUIFont)}>Segoe UI</a></li>
       <li><a className="dropdown-item" href="#three" onClick={() => changeFont(ArialFont)}>Arial Font</a></li>
        </ul>
  </div>

      
        <MakeUppercase
          isDragOver={isDragOver}
          setIsDragOver={setisDragOver}
          file={file}
          setFile={setFile}
          words={words}
          setWords={setWords}
          fontFamily= {fontFamily}     
          ></MakeUppercase>
        <MakeLastUpper
          isDragOver={isDragOver}
          setIsDragOver={setisDragOver}
          file={file}
          setFile={setFile}
          words={words}
          setWords={setWords}
          fontFamily= {fontFamily}     

        ></MakeLastUpper>
        <AddNewLine
          isDragOver={isDragOver}
          setIsDragOver={setisDragOver}
          file={file}
          setFile={setFile}
          words={words}
          setWords={setWords}
          fontFamily= {fontFamily} 
        ></AddNewLine>
        <RemoveLine
          isDragOver={isDragOver}
          setIsDragOver={setisDragOver}
          file={file}
          setFile={setFile}
          words={words}
          setWords={setWords}
          fontFamily= {fontFamily} 
        ></RemoveLine>
        <LetterSpacing font= {fontFamily} ></LetterSpacing>


</div>

        

<div style={{display: 'flex' , flexDirection: 'column', alignItems: 'center', marginTop: '20px', gap: '20px' }}>
        
        <p

          style={{
            marginTop: '5vh',
            maxWidth: '80%',
            whiteSpace: 'pre-line',
            fontSize: '20px',
            textAlign: 'left',
            marginBottom: '50px',
            border: '1px dotted',
            color: 'black',
            boxShadow: '2px 2px 10px #99aee7',
            padding: '40px',
            display: words ? 'block' : 'none',
          }}
          id="changeText11"
        >
          {words}
        </p>
        <DropFile
          isDragOver={isDragOver}
          setIsDragOver={setisDragOver}
          file={file}
          setFile={setFile}
          words={words}
          setWords={setWords}
          fontFamily= {fontFamily} 
        ></DropFile>

  </div>      

    </div>
  );
}
export default App;
function useRef<T>(arg0: null) {
  throw new Error('Function not implemented.');
}

