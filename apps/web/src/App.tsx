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
import { FileOutWithPrefs } from '@repo/api/files';
import { UserOut } from '@repo/api/user';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from './utils/fetching';

function App() {
  const {
    content,
    font,
    letterSpacing,
    backgroundColor,
    maintextColor,
    fontSize,
    swapPairs,
    setFile,
  } = useFileStore();
  const { formType, selectedFileId, setSelectedFileId } = useGeneralStore();
  const processedContent = applyLetterSwapping(content, swapPairs);

  const { data: currentUser, isLoading: userLoading } = useQuery<UserOut>({
    queryFn: () => fetcher<UserOut>({ endpoint: '/users/me' }),
    queryKey: ['user', 'me'],
  });
  const { data: currentFile, isLoading: fileLoading } =
    useQuery<FileOutWithPrefs>({
      queryKey: ['file', selectedFileId],
      queryFn: () =>
        fetcher<FileOutWithPrefs>({
          endpoint: `/files/${selectedFileId}/prefs`,
        }),
      enabled: !!selectedFileId,
    });

  useEffect(() => {
    setSelectedFileId(currentUser?.selected_file_cuid ?? '');
  }, [currentUser]);

  useEffect(() => {
    if (currentFile) {
      const {
        file_cuid,
        extracted_text,
        file_pref: {
          font,
          text_spacing,
          text_color_hex,
          background_color_hex,
          font_size,
        },
      } = currentFile;
      setFile(
        file_cuid,
        extracted_text,
        font,
        text_spacing,
        background_color_hex,
        text_color_hex,
        font_size,
        [],
      );
    }
  }, [currentFile]);

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
            fontSize: `${fontSize}px`,
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
