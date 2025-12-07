import { Auth, TokenOut } from '@repo/api/auth';
import { useMutateBackend } from './fetching';
import { useAuthStore } from './zustand/auth-store';

export function useAuth() {
  const signupMutation = useMutateBackend<Auth, TokenOut>(
    '/auth/signup',
    'POST',
  );
  const loginMutation = useMutateBackend<Auth, TokenOut>('/auth/login', 'POST');
  const logoutMutation = useMutateBackend('/auth/logout', 'POST');
  const { pressedLogin, setToken, setIsAuthenticated, setPressedLogin } =
    useAuthStore();

  async function signup(newUser: Auth) {
    const token = await signupMutation.mutate(newUser);
    if (token) {
      setToken(token.accessToken);
      setIsAuthenticated(true);
      setPressedLogin(!pressedLogin);
    }
  }

  async function login(user: Auth) {
    const token = await loginMutation.mutate(user);
    if (token) {
      setToken(token.accessToken);
      setIsAuthenticated(true);
      setPressedLogin(!pressedLogin);
    }
  }

  async function logout() {
    const data = await logoutMutation.mutate({});
    if (data) {
      setToken('');
      setIsAuthenticated(false);
      setPressedLogin(!pressedLogin);
    }
  }

  return { signup, login, logout };
}
