import { useEffect, useState } from 'react';
import { useAuthStore } from './zustand/auth-store';
import { TokenOut } from '@repo/api/auth';

type Method = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

let dataCache = new Map<string, { data: unknown; refetch: () => void }>();

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

interface FetchBackendOptions {
  endpoint: string;
  key: unknown[];
  enabled?: boolean;
}

export function useFetchBackend<T>({
  endpoint,
  key,
  enabled = true,
}: FetchBackendOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const pressedLogin = useAuthStore((state) => state.pressedLogin);
  const refetch = () => fetchData();

  const fetchData = async (ignore = false) => {
    setIsLoading(true);
    try {
      const response = await fetcher(endpoint, { method: 'GET' });
      if (!ignore) {
        if (!response.ok) {
          setError(new Error(`${response.status}: ${response.statusText}`));
        } else {
          const newData = await response.json();
          setData(newData);
          const newCache = new Map(dataCache);
          newCache.set(JSON.stringify(key), { data: newData, refetch });
          dataCache = newCache;
        }
      }
    } catch {
      if (!ignore) setError(new Error(`Failed to Fetch!`));
    } finally {
      if (!ignore) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      let ignore = false;
      setData(null);
      setError(null);

      if (dataCache.has(JSON.stringify(key))) {
        if (!ignore)
          setData(dataCache.get(JSON.stringify(key))?.data as T | null);
      } else {
        fetchData(ignore);
      }

      return () => {
        if (dataCache.has(JSON.stringify(key))) {
          dataCache.delete(JSON.stringify(key));
        }
        ignore = true;
      };
    }
  }, [pressedLogin, enabled]);

  return { data, error, isLoading, refetch };
}

interface MutateOptions {
  endpoint: string;
  method: Method;
  invalidateKeys?: unknown[][];
}

export function useMutateBackend<T, K>({
  endpoint,
  method,
  invalidateKeys = [],
}: MutateOptions) {
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
        invalidateKeys.forEach((key) => {
          if (dataCache.has(JSON.stringify(key))) {
            const refetch = dataCache.get(JSON.stringify(key))?.refetch;
            if (refetch) {
              refetch();
            }
          }
        });
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
