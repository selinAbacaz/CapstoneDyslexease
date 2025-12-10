import { SwapPair } from './types/swap-pair';

export function applyLetterSwapping(text: string, pairs: SwapPair[]): string {
  if (!text || pairs.length === 0) return text;

  const swapMap = new Map<string, string>();

  pairs.forEach(([char1, char2]) => {
    swapMap.set(char1.toLowerCase(), char2.toLowerCase());
    swapMap.set(char2.toLowerCase(), char1.toLowerCase());

    swapMap.set(char1.toUpperCase(), char2.toUpperCase());
    swapMap.set(char2.toUpperCase(), char1.toUpperCase());
  });

  return text
    .split('')
    .map((char) => swapMap.get(char) || char)
    .join('');
}
