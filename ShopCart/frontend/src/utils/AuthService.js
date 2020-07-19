import {EventEmitter} from 'events';
import {isTokenExpired, decodedValue} from './JwtHelper';

class AuthService extends EventEmitter {

    //Check whether the token exists in the localStorage and it is not expired
    isAuthenticated() {
        const token = localStorage.getItem('token');
        let isExpired = false;
        if(token) {
            isExpired = isTokenExpired(token);
            isExpired = isExpired ? false : true;
        }
        return isExpired;
    } 

    //Fetch the token from the localStorage
    getToken() {
        return localStorage.getItem('token');
    }

    //Return the decoded value of the token
    getDecodedValue(token) {
        return decodedValue(token);
    }
}

export default AuthService;