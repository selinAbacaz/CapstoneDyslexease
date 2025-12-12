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
  ChangeFontSize,
} from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { useGeneralStore } from './utils/zustand/general-store';
import { FileOut, FileOutWithPrefs } from '@repo/api/files';
import { UpdateUser, UserOut } from '@repo/api/user';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from './utils/fetching';
import { useAuthStore } from './utils/zustand/auth-store';

function App() {

function hexToRgb(hex: string) {
  const parsed = hex.replace('#', '');
  const bigint = parseInt(parsed, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// Return true if color is light
function isLightColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  // Perceived luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

// Lighten or darken color by a factor
function adjustColor(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);

  const newR = Math.min(255, Math.max(0, r + amount));
  const newG = Math.min(255, Math.max(0, g + amount));
  const newB = Math.min(255, Math.max(0, b + amount));

  return `rgb(${newR}, ${newG}, ${newB})`;
}

  const qc = useQueryClient();
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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
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
      enabled: !!selectedFileId && isAuthenticated,
    });
  const { data: files, isLoading: filesLoading } = useQuery<FileOut[]>({
    queryFn: () => fetcher<FileOut[]>({ endpoint: '/files' }),
    queryKey: ['files'],
    enabled: isAuthenticated,
  });
  const mutation = useMutation({
    mutationFn: (updateUserDto: UpdateUser): Promise<UserOut> =>
      fetcher({
        endpoint: '/users/me',
        init: { method: 'PATCH', body: JSON.stringify(updateUserDto) },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['file', selectedFileId] });
    },
  });

  function handleSelectFile(selected_file_cuid: string) {
    setSelectedFileId(selected_file_cuid);
    mutation.mutate({ selected_file_cuid });
  }

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

  if (userLoading || fileLoading || filesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="App"
      style={{
        fontFamily: font,
        backgroundColor,
        color: maintextColor,
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      {/* MAIN LAYOUT */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* LEFT SIDEBAR */}
        <div
          style={{
            width: '230px',
            borderRight: '1px solid #ddd',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            overflowY: 'auto',
            flexShrink: 0,
            minWidth: 0,
          }}
        >
          <h6
            style={{
              marginBottom: '12px',
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
              justifyContent: 'left',
              display: 'flex',
              paddingLeft: '2px',
            }}
          >
            Your Documents
          </h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files?.map((file) => (
              <div
                key={file.file_cuid}
                onClick={() => handleSelectFile(file.file_cuid)}
                style={{
                  padding: '10px',
                  border: '1px solid #dcdcdc',
                  borderRadius: '8px',
                  backgroundColor: backgroundColor,
                  cursor: 'pointer',
                  transition: '0.15s',
                }}
                onMouseEnter={(e) => {
                  const lighter = adjustColor(backgroundColor, +40); // lighten
                  const darker = adjustColor(backgroundColor, -40); // darken

                  e.currentTarget.style.backgroundColor = isLightColor(
                    backgroundColor,
                  )
                    ? darker
                    : lighter;
                }}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = backgroundColor)
                }
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {file.file_name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE — TOOLBAR + EDITOR */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}
        >
          {/* GOOGLE DOCS STYLE TOOLBAR */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              padding: '10px 14px',
              borderBottom: '1px solid #e3e3e3',
              backgroundColor: '#fafafa',
              flexWrap: 'wrap',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            {/* Group 1 — Styles */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                background: backgroundColor,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <FontDropdown />
              <ChangeBgColor />
              <LetterSpacing />
            </div>

            {/* Group 2 — Text Transform */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                background: backgroundColor,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                color: maintextColor,
              }}
            >
              <MakeFirstUpper />
              <MakeLastUpper />
              <AddNewLine />
              <RemoveLine />
            </div>

            {/* Group 3 — Extra Tools */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                background: backgroundColor,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <LetterSwapControl />
              <ChangeFontSize />
            </div>
          </div>

          {/* EDITOR */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '30px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {content ? (
              <p
                id="changeText11"
                style={{
                  maxWidth: '60vw',
                  width: '100%',
                  whiteSpace: 'pre-line',
                  fontSize: `${fontSize}px`,
                  padding: '35px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                  letterSpacing: `${letterSpacing}px`,
                  color: 'black',
                }}
              >
                {processedContent}
              </p>
            ) : (
              <DropFile />
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR — DOC INFO */}
        <div
          style={{
            width: '200px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderLeft: '1px solid #ddd',
            flexShrink: 0,
            minWidth: 0,
          }}
        >
          <h6
            style={{
              marginBottom: '12px',
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
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
