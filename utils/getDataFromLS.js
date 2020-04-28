export const getDataFromLS = (property) => {
    if(!process.browser) return null;
    const data = localStorage.getItem(property);
    if(!data) return null;
    return JSON.parse(data);
}