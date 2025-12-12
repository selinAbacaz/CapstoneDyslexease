import { Auth, TokenOut } from '@repo/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from './fetching';
import { useAuthStore } from './zustand/auth-store';

export function useAuth() {
  const qc = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);
  const signupMutation = useMutation({
    mutationFn: (newUser: Auth): Promise<TokenOut> =>
      fetcher({
        endpoint: '/auth/signup',
        init: { method: 'POST', body: JSON.stringify(newUser) },
      }),
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });

  const loginMutation = useMutation({
    mutationFn: (user: Auth): Promise<TokenOut> =>
      fetcher({
        endpoint: '/auth/login',
        init: { method: 'POST', body: JSON.stringify(user) },
      }),
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: (): Promise<TokenOut> =>
      fetcher({
        endpoint: '/auth/logout',
        init: { method: 'POST' },
      }),
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });

  function signup(newUser: Auth) {
    signupMutation.mutate(newUser);
  }

  function login(user: Auth) {
    loginMutation.mutate(user);
  }

  function logout() {
    setToken('');
    logoutMutation.mutate();
  }

  return { signup, login, logout };
}
