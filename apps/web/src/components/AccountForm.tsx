import { FormEvent, useState } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { useAuth } from '../utils/auth-helpers';
import { Auth } from '@repo/api/auth';

interface AccountFormProps {
  children?: React.ReactNode;
}

export function AccountForm({ children }: AccountFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signup, login } = useAuth();

  function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    const newUser: Auth = { username, email, password };
    if (children?.toString().toLowerCase() === 'signup') {
      signup(newUser);
    } else if (children?.toString().toLowerCase() === 'login') {
      login(newUser);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        inset: 0,
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        className="modal show"
        style={{
          padding: '2rem',
          borderRadius: '0.375rem',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          display: 'block',
        }}
      >
        <ModalDialog>
          <ModalHeader closeButton>
            <ModalTitle>{children}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <InputGroup>
                <InputGroupText>Username</InputGroupText>
                <FormControl
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupText>Email</InputGroupText>
                <FormControl
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup onSubmit={(e) => handleSubmit}>
                <InputGroupText>Password</InputGroupText>
                <FormControl
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button disabled={!username || !password || !email}>
              {children}
            </Button>
          </ModalFooter>
        </ModalDialog>
      </div>
    </div>
  );
}
