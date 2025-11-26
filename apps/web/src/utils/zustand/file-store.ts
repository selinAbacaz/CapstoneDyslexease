import { create } from 'zustand';
import { FONTS } from '../constants';

type FileStore = {
  content: string;
  font: string;
  letterSpacing: number;
  backgroundColor: string;
  setContent: (newContent: string) => void;
  setFont: (newFont: string) => void;
  setLetterSpacing: (newSpacing: number) => void;
  setBackgroundColor: (newColor: string) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  content: '',
  font: FONTS.arial.font,
  letterSpacing: 0,
  backgroundColor: '#FFFFFF',
  setContent: (newContent: string) => {
    set({ content: newContent });
  },
  setFont: (newFont: string) => {
    set({ font: newFont });
  },
  setLetterSpacing: (newSpacing: number) => {
    set({ letterSpacing: newSpacing });
  },
  setBackgroundColor: (newColor: string) => {
    set({ backgroundColor: newColor });
  },
}));
