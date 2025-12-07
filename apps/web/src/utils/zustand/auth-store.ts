import { create } from 'zustand';

type AuthStore = {
  token: string;
  isAuthenticated: boolean;
  pressedLogin: boolean;
  setToken: (newToken: string) => void;
  setIsAuthenticated: (newAuthStatus: boolean) => void;
  setPressedLogin: (pressed: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: '',
  isAuthenticated: false,
  pressedLogin: false,
  setToken: (newToken: string) => {
    set({ token: newToken });
  },
  setIsAuthenticated: (newAuthStatus: boolean) => {
    set({ isAuthenticated: newAuthStatus });
  },
  setPressedLogin: (pressed: boolean) => {
    set({ pressedLogin: pressed });
  },
}));
