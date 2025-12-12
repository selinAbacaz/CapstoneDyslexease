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
        width: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {/* LEFT SIDEBAR */}
        <div
          style={{
            width: '220px',
            borderRight: '2px solid #ddd',
            padding: '15px',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa',
            flexShrink: 0,
          }}
        >
          <h5 style={{ marginBottom: '12px', fontWeight: 'bold' }}>
            Your Files
          </h5>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data?.map((file) => (
              <div
                key={file.file_cuid}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {file.file_name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN AREA */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* TOOLBAR */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              padding: '10px',
              borderBottom: '2px solid #ddd',
              backgroundColor: '#f0f0f0',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <FontDropdown />
            <ChangeBgColor />
            <LetterSpacing />
            <MakeFirstUpper />
            <MakeLastUpper />
            <AddNewLine />
            <RemoveLine />
            <LetterSwapControl />
          </div>

          {/* EDITOR */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '30px', // Slightly smaller
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {content ? (
              <p
                id="changeText11"
                style={{
                  maxWidth: '760px', // Slightly smaller
                  width: '100%',
                  whiteSpace: 'pre-line',
                  fontSize: '20px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  padding: '35px',
                  letterSpacing: `${letterSpacing}px`,
                  backgroundColor: 'white',
                  borderRadius: '5px',
                }}
              >
                {processedContent}
              </p>
            ) : (
              <DropFile />
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div
          style={{
            width: '180px', // SQUISHED
            borderLeft: '2px solid #ddd',
            padding: '15px', // SQUISHED
            backgroundColor: '#f8f9fa',
            flexShrink: 0,
          }}
        >
          <h6 style={{ marginBottom: '12px', fontWeight: 'bold' }}>
            Document Info
          </h6>

          <div style={{ fontSize: '13px', color: '#666' }}>
            <div style={{ marginBottom: '8px' }}>
              Font: <strong>{font}</strong>
            </div>
            <div style={{ marginBottom: '8px' }}>
              Letter Spacing: <strong>{letterSpacing}px</strong>
            </div>
            <div style={{ marginBottom: '8px' }}>
              Characters: <strong>{content.length}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {formType === 'signup' && <SignupForm />}
      {formType === 'login' && <LoginForm />}
      {formType === 'file-create' && <CreateFileForm />}
    </div>
  );
}
export default App;
