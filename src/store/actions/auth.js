import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSigninSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SIGN_IN_SUCCESS,
        idToken,
        userId
    };
};

export const authSignupSuccess = (kind) => {
    return {
        type: actionTypes.AUTH_SIGN_UP_SUCCESS,
        kind
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHlBiGsJSOFL4ALW-DVwV8yG255K7Z7gw';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHlBiGsJSOFL4ALW-DVwV8yG255K7Z7gw';
        }
        axios.post(url, authData).then(response => {
            if (isSignup) {
                dispatch(authSignupSuccess(response.data.kind));
            }
            else {
                dispatch(authSigninSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }
        }).catch(error => {
            dispatch(authFail(error.response.data.error.message));
        });
    };
};