import { create } from 'zustand';

type AuthStore = {
  token: string;
  isAuthenticated: boolean;
  setToken: (newToken: string) => void;
  setIsAuthenticated: (newAuthStatus: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: '',
  isAuthenticated: false,
  setToken: (newToken: string) => {
    set({ token: newToken });
  },
  setIsAuthenticated: (newAuthStatus: boolean) => {
    set({ isAuthenticated: newAuthStatus });
  },
}));
