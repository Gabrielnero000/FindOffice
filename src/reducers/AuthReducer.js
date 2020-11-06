import {
    AUTH_SIGN_UP,
    AUTH_SIGN_UP_FAIL,
    AUTH_SIGN_UP_SUCCESS,
    AUTH_LOGIN,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN_SUCCESS
} from '../actions/types'

const initialState = {
    errorLoging: '',
    errorCreating: '',
    waiting: false,
    user: null
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SIGN_UP:
            return { ...initialState, loading: true }
        case AUTH_SIGN_UP_FAIL:
            return { ...state, errorCreating: action.reason, loading: false }
        case AUTH_SIGN_UP_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        case AUTH_LOGIN:
            return { ...initialState, loading: true }
        case AUTH_LOGIN_FAIL:
            return { ...state, errorLoging: action.reason, loading: false}
        case AUTH_LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        default:
            return state
    }
}

export default AuthReducer