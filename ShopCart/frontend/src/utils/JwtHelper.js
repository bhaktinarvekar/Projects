import decode  from 'jwt-decode';

//decode the token and check whether it is expired
export const isTokenExpired = token => {
    const decoded = decode(token);
    const newDate = new Date().getTime()/1000;
    if(decoded.exp >  newDate)
        return false;
    return true;
}

//decode the token
export const decodedValue = token => {
    return decode(token);
}