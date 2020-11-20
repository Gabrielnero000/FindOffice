import {
    AUTH_SIGN_UP,
    AUTH_SIGN_UP_FAIL,
    AUTH_SIGN_UP_SUCCESS,
    AUTH_LOGIN,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN_SUCCESS
} from './types'

import AuthApi from '../../api/AuthApi'

import { Actions } from 'react-native-router-flux'

const startApp = user => {
    if (user.isTenant)
        Actions.tenant()
    else
        Actions.user()
}

const signUpFail = (dispatch, error) => {
    dispatch({
        type: AUTH_SIGN_UP_FAIL,
        reason: error
    })
}

const signUpSuccess = (dispatch, user) => {
    dispatch({
        type: AUTH_SIGN_UP_SUCCESS,
        payload: user
    })

    startApp(user)
}

const loginFail = (dispatch, error) => {
    dispatch({
        type: AUTH_LOGIN_FAIL,
        reason: error
    })
}

const loginSuccess = (dispatch, user) => {
    dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: user
    })

    startApp(user)
}

export const signUp = user => {
    return dispatch => {
        dispatch({ type: AUTH_SIGN_UP })

        AuthApi.signUp(user)
            .then(result => result.success ? signUpSuccess(dispatch, result.user) : signUpFail(dispatch, result.error))
            .catch(error => signUpFail(dispatch, error.error))
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch({ type: AUTH_LOGIN })
        AuthApi.login(email, password)
            .then(result => result.success ? loginSuccess(dispatch, result.user) : loginFail(dispatch, result.error))
            .catch(error => loginFail(dispatch, error.error))
    }
}