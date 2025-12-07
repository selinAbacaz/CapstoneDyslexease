import { useEffect, useState } from 'react';
import { useAuthStore } from './zustand/auth-store';
import { TokenOut } from '@repo/api/auth';

type Method = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

async function fetcher(endpoint: string, init: RequestInit) {
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
      return newResponse;
    }
  }

  return response;
}

export function useFetchBackend<T>(endpoint: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const pressedLogin = useAuthStore((state) => state.pressedLogin);

  useEffect(() => {
    let ignore = false;
    setData(null);
    setError(null);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetcher(endpoint, { method: 'GET' });
        if (!ignore) {
          if (!response.ok) {
            setError(new Error(`${response.status}: ${response.statusText}`));
          } else {
            const newData = await response.json();
            setData(newData);
          }
        }
      } catch {
        if (!ignore) setError(new Error(`Failed to Fetch!`));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, [pressedLogin]);

  return { data, error, isLoading };
}

export function useMutateBackend<T, K>(endpoint: string, method: Method) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function mutate(variables: T) {
    let newData: K | null = null;
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetcher(endpoint, {
        method,
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        setError(new Error(`${response.status}: ${response.statusText}`));
      } else {
        newData = await response.json();
        setSuccess(true);
      }
    } catch {
      setError(new Error(`Failed to Mutate!`));
    } finally {
      setIsLoading(false);
      return newData;
    }
  }

  return { isLoading, error, success, mutate };
}
