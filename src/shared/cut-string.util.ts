export const cutString = (str: string, maxCountSymbols: number): string => {
    if(str.length < maxCountSymbols) return str;
    return str.slice(0, maxCountSymbols - 3) + '...';
}