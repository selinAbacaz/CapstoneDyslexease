import { create } from 'zustand';
import { FONTS } from '../constants';

export type SwapPair = [string, string];

type FileStore = {
  content: string;
  font: string;
  letterSpacing: number;
  backgroundColor: string;
  maintextColor: string;
  swapPairs: SwapPair[];
  setContent: (newContent: string) => void;
  setFont: (newFont: string) => void;
  setLetterSpacing: (newSpacing: number) => void;
  setBackgroundColor: (newColor: string) => void;
  setMainTextColor: (newTextColor: string) => void;
  addSwapPair: (pair: SwapPair) => void;
  removeSwapPair: (index: number) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  content: '',
  font: FONTS.arial.font,
  letterSpacing: 0,
  backgroundColor: '#FFFFFF',
  maintextColor: 'black',

  swapPairs: [],

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
  setMainTextColor: (newTextColor: string) => {
    set({ maintextColor: newTextColor });
  },
  addSwapPair: (pair: SwapPair) => set((state: FileStore) => ({ 
    swapPairs: [...state.swapPairs, pair] 
  })),
  removeSwapPair: (index: number) => set((state: FileStore) => ({ 
    swapPairs: state.swapPairs.filter((_, i) => i !== index) 
  })),
}));
