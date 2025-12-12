import { create } from 'zustand';
import { DEFAULT_FILE_PREFS, FONTS } from '../constants';
import { SwapPair } from '../types/swap-pair';
import { FileOut } from '@repo/api/files';

const {
  content,
  letterSpacing,
  backgroundColor,
  maintextColor,
  fontSize,
  swapPairs,
} = DEFAULT_FILE_PREFS;

type FileStore = {
  allFiles: FileOut[];
  selectedFileId: string;
  content: string;
  font: string;
  letterSpacing: number;
  backgroundColor: string;
  maintextColor: string;
  fontSize: number;
  swapPairs: SwapPair[];
  setAllFiles: (newFiles: FileOut[]) => void;
  setSelectedFileId: (newId: string) => void;
  setContent: (newContent: string) => void;
  setFont: (newFont: string) => void;
  setLetterSpacing: (newSpacing: number) => void;
  setBackgroundColor: (newColor: string) => void;
  setMainTextColor: (newTextColor: string) => void;
  setFontSize: (newFontSize: number) => void;
  addSwapPair: (pair: SwapPair) => void;
  removeSwapPair: (index: number) => void;
  setFile: (
    newId: string,
    newContent: string,
    newFont: string,
    newSpacing: number,
    newColor: string,
    newTextColor: string,
    fontSize: number,
    newPairs: SwapPair[],
  ) => void;
  reset: () => void;
};

export const useFileStore = create<FileStore>((set, get, store) => ({
  allFiles: [],
  selectedFileId: '',
  content,
  font: FONTS.arial.font,
  letterSpacing,
  backgroundColor,
  maintextColor,
  fontSize,
  swapPairs,
  setContent: (newContent: string) => {
    set({ content: newContent });
  },
  setSelectedFileId: (newId: string) => {
    set({ selectedFileId: newId });
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
  setFontSize: (newFontSize: number) => {
    set({ fontSize: newFontSize });
  },
  addSwapPair: (pair: SwapPair) =>
    set((state: FileStore) => ({
      swapPairs: [...state.swapPairs, pair],
    })),
  removeSwapPair: (index: number) =>
    set((state: FileStore) => ({
      swapPairs: state.swapPairs.filter((_, i) => i !== index),
    })),
  setAllFiles: (newFiles: FileOut[]) => {
    set({ allFiles: newFiles });
  },
  setFile: (
    newId: string,
    newContent: string,
    newFont: string,
    newSpacing: number,
    newColor: string,
    newTextColor: string,
    newFontSize: number,
    newPairs: SwapPair[],
  ) => {
    set({ selectedFileId: newId });
    set({ content: newContent });
    set({ font: newFont });
    set({ letterSpacing: newSpacing });
    set({ backgroundColor: newColor });
    set({ maintextColor: newTextColor });
    set({ fontSize: newFontSize });
    set({ swapPairs: newPairs });
  },
  reset: () => {
    set(store.getInitialState, true);
  },
}));
