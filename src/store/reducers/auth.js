import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken: null,
    userId: null,
    loading: false,
    error: null,
    kind: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.AUTH_SIGN_IN_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }

        case actionTypes.AUTH_SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                kind: action.kind
            }

        case actionTypes.CLEAR_SIGNUP_KIND:
            return {
                ...state,
                kind: null
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null,
                kind: null
            }

        default:
            return state;
    }
}

export default reducer;