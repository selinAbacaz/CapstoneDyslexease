import { create } from 'zustand';

type FileStore = {
  content: string;
  font: string;
  setContent: (newContent: string) => void;
  setFont: (newFont: string) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  content: '',
  font: '',
  setContent: (newContent: string) => {
    set({ content: newContent });
  },
  setFont: (newFont: string) => {
    set({ font: newFont });
  },
}));
