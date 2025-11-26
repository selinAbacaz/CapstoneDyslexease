import { create } from 'zustand';
import { FONTS } from '../constants';

type FileStore = {
  content: string;
  font: string;
  setContent: (newContent: string) => void;
  setFont: (newFont: string) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  content: '',
  font: FONTS.arial.font,
  setContent: (newContent: string) => {
    set({ content: newContent });
  },
  setFont: (newFont: string) => {
    set({ font: newFont });
  },
}));
