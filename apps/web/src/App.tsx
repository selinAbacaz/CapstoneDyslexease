import { useFileStore } from './utils/zustand/file-store';
import {
  AddNewLine,
  MakeFirstUpper,
  MakeLastUpper,
  RemoveLine,
  LetterSpacing,
  FontDropdown,
  DropFile,
  Navbar,
} from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

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
