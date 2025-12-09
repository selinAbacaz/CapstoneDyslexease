import { Button } from 'react-bootstrap';
import { useAuthStore } from '../utils/zustand/auth-store';
import { useAuth } from '../utils/auth-helpers';

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
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
      }}
    >
      <h2>Dyslexease</h2>
      {!isAuthenticated && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button>Login</Button>
          <Button>Signup</Button>
        </div>
      )}
      {isAuthenticated && <Button onClick={logout}>Logout</Button>}
    </div>
  );
}
