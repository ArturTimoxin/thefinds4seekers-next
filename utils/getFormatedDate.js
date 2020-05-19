const getFormatedDate = (dateObj) => {
    const date = new Date(dateObj);
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    return `${dd}.${mm}.${yyyy}`;
}

export const getFullDateInfo = (dateObj) => {
    const date = new Date(dateObj);
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    const hours = date.getHours();
    const minutes = date.getMinutes(); 
    const seconds = date.getSeconds();

    return `${dd}.${mm}.${yyyy} ${hours}:${minutes}:${seconds}`;
}

export default getFormatedDate;