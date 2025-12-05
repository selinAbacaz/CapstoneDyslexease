import { useUserStore } from './zustand/user-store';
import { TokenOut } from '@repo/api/auth';

async function fetcher<T>(endpoint: string, init: RequestInit) {
  const { token, setToken } = useUserStore.getState();
  const mainRequest = async (accessToken: string) => {
    return await fetch(
      `${import.meta.env.VITE_BACKEND_URL as string}${endpoint}`,
      {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init.headers,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        credentials: 'include',
      },
    );
  };
  let response = await mainRequest(token);

  if (response.status === 401) {
    const tokenResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL as string}/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (tokenResponse.status === 201) {
      const newToken = (await tokenResponse.json()) as TokenOut;
      setToken(newToken.accessToken);

      let newResponse = await mainRequest(newToken.accessToken);
      if (!newResponse.ok) {
        throw new Error(`${newResponse.status} ${newResponse.statusText}`);
      }
      return (await newResponse.json()) as T;
    } else {
      throw new Error(`${tokenResponse.status} ${tokenResponse.statusText}`);
    }
  } else if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export function fetchBackend<T>(endpoint: string) {
  return fetcher<T>(endpoint, { method: 'GET' });
}

export function mutateBackend<T, K>(
  endpoint: string,
  method: string,
  variables: T,
) {
  return fetcher<K>(endpoint, { method, body: JSON.stringify(variables) });
}
