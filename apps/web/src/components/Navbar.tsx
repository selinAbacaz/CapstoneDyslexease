import { Button } from 'react-bootstrap';
import { useAuthStore } from '../utils/zustand/auth-store';
import { useAuth } from '../utils/auth-helpers';
import { useGeneralStore } from '../utils/zustand/general-store';
import { Save } from './Save';
import { Delete } from './Delete';

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setFormType = useGeneralStore((state) => state.setFormType);
  const { logout } = useAuth();

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
        zIndex: 5,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <h2>Dyslexease</h2>
        <Button
          hidden={!isAuthenticated}
          onClick={() => setFormType('file-create')}
        >
          Create File
        </Button>
        <Save />
        <Delete />
      </div>
      {!isAuthenticated && (
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={() => setFormType('login')}>Login</Button>
          <Button onClick={() => setFormType('signup')}>Signup</Button>
        </div>
      )}
      {isAuthenticated && <Button onClick={logout}>Logout</Button>}
    </div>
  );
}
