import { create } from 'zustand';
import { FONTS } from '../constants';

type FileStore = {
  content: string;
  font: string;
  letterSpacing: number;
  setContent: (newContent: string) => void;
  setFont: (newFont: string) => void;
  setLetterSpacing: (newSpacing: number) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  content: '',
  font: FONTS.arial.font,
  letterSpacing: 0,
  setContent: (newContent: string) => {
    set({ content: newContent });
  },
  setFont: (newFont: string) => {
    set({ font: newFont });
  },
  setLetterSpacing: (newSpacing: number) => {
    set({ letterSpacing: newSpacing });
  },
}));
