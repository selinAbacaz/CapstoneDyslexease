import { useState } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { Auth } from '@repo/api/auth';
import { useAuth } from '../../utils/auth-helpers';
import { useGeneralStore } from '../../utils/zustand/general-store';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setFormType = useGeneralStore((state) => state.setFormType);
  const { login } = useAuth();

  async function handleSubmit() {
    const user: Auth = { username, email: '', password };
    await login(user);
    setFormType('none');
  }

  function handleClose() {
    setFormType('none');
  }

  return (
    <Modal show={true} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Login</ModalTitle>
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
        <Button onClick={handleSubmit} disabled={!username || !password}>
          Login
        </Button>
      </ModalFooter>
    </Modal>
  );
}
