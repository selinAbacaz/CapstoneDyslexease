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
import { FileOutWithPrefs } from '@repo/api/files';
import { UserOut } from '@repo/api/user';
import { useEffect } from 'react';

function App() {
  const {
    content,
    font,
    letterSpacing,
    backgroundColor,
    maintextColor,
    swapPairs,
    setFile,
  } = useFileStore();
  const { formType, selectedFileId, setSelectedFileId } = useGeneralStore();
  const processedContent = applyLetterSwapping(content, swapPairs);

  const { data: currentUser, isLoading: userLoading } =
    useFetchBackend<UserOut>({
      endpoint: '/users/me',
      key: ['me'],
    });
  const { data: currentFile, isLoading: fileLoading } =
    useFetchBackend<FileOutWithPrefs>({
      endpoint: `/files/${selectedFileId}/prefs`,
      key: ['file', selectedFileId],
      enabled: !!selectedFileId,
    });

  useEffect(() => {
    if (currentFile) {
      const {
        file_cuid,
        extracted_text,
        file_pref: { font, text_spacing, text_color_hex, background_color_hex },
      } = currentFile;
      setFile(
        file_cuid,
        extracted_text,
        font,
        text_spacing,
        background_color_hex,
        text_color_hex,
        [],
      );
    }
  }, [currentFile]);

  useEffect(() => {
    if (currentUser?.selected_file_cuid) {
      setSelectedFileId(currentUser.selected_file_cuid);
    }
  }, [currentUser]);

  if (userLoading || fileLoading) {
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
