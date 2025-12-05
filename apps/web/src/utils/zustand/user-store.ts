import { create } from 'zustand';

type UserStore = {
  token: string;
  setToken: (newToken: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  token: '',
  setToken: (newToken: string) => {
    set({ token: newToken });
  },
}));
