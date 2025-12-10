import { Button } from 'react-bootstrap';
import { useAuthStore } from '../utils/zustand/auth-store';
import { useAuth } from '../utils/auth-helpers';
import { useGeneralStore } from '../utils/zustand/general-store';
import { CreateFileWithPrefs, FileOut } from '@repo/api/files';
import { DEFAULT_FILE_PREFS } from '../utils/constants';
import { useMutateBackend } from '../utils/fetching';

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAccountForm = useGeneralStore((state) => state.setFormType);
  const { logout } = useAuth();

  const createFile = useMutateBackend<CreateFileWithPrefs, FileOut>(
    '/files/prefs',
    'POST',
  );

  function createBlankFile() {
    const {
      content,
      font,
      letterSpacing,
      backgroundColor,
      maintextColor,
      swapPairs,
    } = DEFAULT_FILE_PREFS;
    const newFile: CreateFileWithPrefs = {
      file_name: '',
      file_pref: {
        font,
        text_color_hex: maintextColor,
        background_color_hex: backgroundColor,
        text_spacing: letterSpacing,
        letterSwaps: swapPairs,
      },
      extracted_text: content,
    };

    createFile.mutate(newFile);
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        justifyContent: 'space-between',
        fontSize: '24px',
        padding: '5px',
        borderBottom: '2px solid #7c95d9',
        boxShadow: '2px 2px 10px #99aee7',
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <h2>Dyslexease</h2>
        <Button onClick={createBlankFile}>Create File</Button>
        {createFile.isLoading && <span>Loading...</span>}
      </div>
      {!isAuthenticated && (
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={() => setAccountForm('login')}>Login</Button>
          <Button onClick={() => setAccountForm('signup')}>Signup</Button>
        </div>
      )}
      {isAuthenticated && <Button onClick={logout}>Logout</Button>}
    </div>
  );
}
