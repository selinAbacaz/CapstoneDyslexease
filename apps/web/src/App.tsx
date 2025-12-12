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
  SignupForm,
  LoginForm,
  CreateFileForm,
} from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { useGeneralStore } from './utils/zustand/general-store';
import { useFetchBackend } from './utils/fetching';
import { FileOut } from '@repo/api/files';
import { useEffect } from 'react';

function App() {
  const {
    content,
    font,
    letterSpacing,
    backgroundColor,
    maintextColor,
    swapPairs,
    setAllFiles,
  } = useFileStore();
  const formType = useGeneralStore((state) => state.formType);
  const processedContent = applyLetterSwapping(content, swapPairs);

  const { data, isLoading } = useFetchBackend<FileOut[]>({
    endpoint: '/files',
    key: ['files'],
  });

  useEffect(() => {
    if (data) {
      setAllFiles(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      {formType === 'signup' && <SignupForm />}
      {formType === 'login' && <LoginForm />}
      {formType === 'file-create' && <CreateFileForm />}
    </div>
  );
}
export default App;
