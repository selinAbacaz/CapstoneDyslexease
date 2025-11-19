
import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';


export type SwapPair = [string, string]; 


interface CustomizationContextType {
  backgroundColor: string;
  updateBackgroundColor: (color: string) => void;
  
  letterSwapPairs: SwapPair[]; 
  addLetterSwapPair: (pair: SwapPair) => void;
  removeLetterSwapPair: (index: number) => void; 
}

const defaultCustomization: CustomizationContextType = {
  backgroundColor: '#ffffff', 
  updateBackgroundColor: () => {},
  letterSwapPairs: [],
  addLetterSwapPair: () => {},
  removeLetterSwapPair: () => {},
};

const CustomizationContext = createContext<CustomizationContextType>(defaultCustomization);

interface CustomizationProviderProps {
  children: ReactNode;
}

export const CustomizationProvider: React.FC<CustomizationProviderProps> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [letterSwapPairs, setLetterSwapPairs] = useState<SwapPair[]>([]);

  const updateBackgroundColor = (color: string) => setBackgroundColor(color);

  const addLetterSwapPair = (pair: SwapPair) => {
    if (pair[0].toLowerCase() !== pair[1].toLowerCase()) {
        setLetterSwapPairs(prev => [...prev, pair]);
    }
  };

  const removeLetterSwapPair = (index: number) => {
    setLetterSwapPairs(prev => prev.filter((_, i) => i !== index));
  };

  const contextValue = useMemo(() => ({
    backgroundColor,
    updateBackgroundColor,
    letterSwapPairs,
    addLetterSwapPair,
    removeLetterSwapPair,
  }), [backgroundColor, letterSwapPairs]);

  return (
    <CustomizationContext.Provider value={contextValue}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => useContext(CustomizationContext);