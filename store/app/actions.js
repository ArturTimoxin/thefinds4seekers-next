import * as constants from './actionTypes';

export const login = (userData, token) => {

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', JSON.stringify(token));

    return dispatch => {
        dispatch({ 
            type: constants.LOGIN,
            payload: { userData, token }
        })
    }
}

export const logout = () => {

    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    
    return dispatch => {
        dispatch({ type: constants.LOGOUT })
    }
}

export const toggleAuthModal = () => {
    return {
        type: constants.TOGGLE_AUTH_MODAL
    }
}

export const setAuthModalMode = (isLogin) => {
    return {
        type: constants.SET_AUTH_MODAL_MODE,
        payload: { isLogin }
    }
}