const generateQweryString = obj => {
    const arrParams = [];
    Object.keys(obj).forEach(key => {
       if(obj[key]) arrParams.push(key + '=' + obj[key]);
    });
    return arrParams.join('&');
}

export default generateQweryString;