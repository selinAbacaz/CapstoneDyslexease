import { SwapPair } from '../context/CustomizationContext'; 

export function applyLetterSwapping(text: string, swapPairs: SwapPair[]): string {
    const swapMap = new Map<string, string>();

    for (const [charA, charB] of swapPairs) {
        swapMap.set(charA.toLowerCase(), charB.toLowerCase());
        swapMap.set(charB.toLowerCase(), charA.toLowerCase());

        swapMap.set(charA.toUpperCase(), charB.toUpperCase());
        swapMap.set(charB.toUpperCase(), charA.toUpperCase());
    }

    return text.split('').map(char => {
        return swapMap.get(char) ?? char;
    }).join('');
}