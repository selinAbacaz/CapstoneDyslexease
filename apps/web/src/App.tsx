import { useFileStore } from './utils/zustand/file-store';
import { applyLetterSwapping } from './utils/textTransformer';
import {
  AddNewLine,
  MakeFirstUpper,
  MakeLastUpper,
  RemoveLine,
  LetterSpacing,
  FontDropdown,
  DropFile,
  Navbar,
  ChangeBgColor,
  LetterSwapControl,
} from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { AccountForm } from './components/AccountForm';
import { useGeneralStore } from './utils/zustand/general-store';

function App() {
  const {
    content,
    font,
    letterSpacing,
    backgroundColor,
    maintextColor,
    swapPairs,
  } = useFileStore();
  const accountFormType = useGeneralStore((state) => state.accountFormType);
  const processedContent = applyLetterSwapping(content, swapPairs);

  return (
    <div
      className="App"
      id="container"
      style={{
        fontFamily: font,
        backgroundColor: backgroundColor,
        color: maintextColor,
        minHeight: '100vh',
      }}
    >
      <Navbar />

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '5vh',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <FontDropdown />
        <MakeFirstUpper />
        <MakeLastUpper />
        <AddNewLine />
        <RemoveLine />
        <ChangeBgColor />
        <LetterSpacing />
        <LetterSwapControl />
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
            boxShadow: '2px 2px 10px #99aee7',
            padding: '40px',
            display: content ? 'block' : 'none',
            letterSpacing: `${letterSpacing}px`,
          }}
          id="changeText11"
        >
          {processedContent}
        </p>
        <DropFile />
      </div>
      {accountFormType === 'signup' && <AccountForm>Signup</AccountForm>}
      {accountFormType === 'login' && <AccountForm>Login</AccountForm>}
    </div>
  );
}
export default App;
