const isSameStrings = (string1: string, string2: string): boolean => {
    const compareString1 = string1.toLowerCase().trim();
    const compareString2 = string2.toLowerCase().trim();
    return compareString1 === compareString2;
}

export default isSameStrings;