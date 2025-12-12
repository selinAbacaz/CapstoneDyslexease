import { Auth, TokenOut } from '@repo/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from './fetching';
import { useAuthStore } from './zustand/auth-store';
import { useFileStore } from './zustand/file-store';

export function useAuth() {
  const qc = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const reset = useFileStore((state) => state.reset);
  const signupMutation = useMutation({
    mutationFn: (newUser: Auth): Promise<TokenOut> =>
      fetcher({
        endpoint: '/auth/signup',
        init: { method: 'POST', body: JSON.stringify(newUser) },
      }),
  });

  const loginMutation = useMutation({
    mutationFn: (user: Auth): Promise<TokenOut> =>
      fetcher({
        endpoint: '/auth/login',
        init: { method: 'POST', body: JSON.stringify(user) },
      }),
  });

  const logoutMutation = useMutation({
    mutationFn: (): Promise<TokenOut> =>
      fetcher({
        endpoint: '/auth/logout',
        init: { method: 'POST' },
      }),
  });

  async function signup(newUser: Auth) {
    const data = await signupMutation.mutateAsync(newUser);
    setToken(data.accessToken);
    setIsAuthenticated(true);
    await qc.invalidateQueries();
  }

  async function login(user: Auth) {
    const data = await loginMutation.mutateAsync(user);
    setToken(data.accessToken);
    setIsAuthenticated(true);
    await qc.invalidateQueries();
  }

  async function logout() {
    await logoutMutation.mutateAsync();
    setToken('');
    setIsAuthenticated(false);
    reset();
    qc.removeQueries();
  }

  return { signup, login, logout };
}
