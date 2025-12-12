import { useAuthStore } from './zustand/auth-store';
import { TokenOut } from '@repo/api/auth';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

interface FetcherOptions {
  endpoint: string;
  init?: RequestInit;
}

export async function fetcher<T>({ endpoint, init = {} }: FetcherOptions) {
  const { token, setToken, setIsAuthenticated } = useAuthStore.getState();

  async function mainRequest(accessToken: string) {
    return await fetch(`${BACKEND_URL}${endpoint}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      credentials: 'include',
    });
  }

  const response = await mainRequest(token);

  if (response.status === 401) {
    const tokenResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (tokenResponse.ok) {
      const newToken = (await tokenResponse.json()) as TokenOut;
      setToken(newToken.accessToken);
      setIsAuthenticated(true);

      let newResponse = await mainRequest(newToken.accessToken);
      return (await newResponse.json()) as T;
    }
  }

  return (await response.json()) as T;
}
