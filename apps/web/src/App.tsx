import { useFileStore } from './utils/zustand/file-store';
import { DropFile } from './components/FileDragger';
import { MakeFirstUpper } from './components/MakeUppercase';
import { MakeLastUpper } from './components/MakeLastUpper';
import { LetterSpacing } from './components/LetterSpacing';
import { AddNewLine } from './components/AddNewLine';
import { RemoveLine } from './components/RemoveLine';
import { Navbar } from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { FontDropdown } from './components/FontDropdown';

function App() {
  const { content, font } = useFileStore();

  return (
    <div className="App" id="container" style={{ fontFamily: font }}>
      <Navbar />

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '5vh',
          justifyContent: 'center',
        }}
      >
        <FontDropdown />
        <MakeFirstUpper />
        <MakeLastUpper />
        <AddNewLine />
        <RemoveLine />
        <LetterSpacing />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          gap: '20px',
        }}
      >
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
            display: content ? 'block' : 'none',
          }}
          id="changeText11"
        >
          {content}
        </p>
        <DropFile />
      </div>
    </div>
  );
}
export default App;
