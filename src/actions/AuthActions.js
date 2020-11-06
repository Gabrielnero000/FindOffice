import {
    AUTH_SIGN_UP,
    AUTH_SIGN_UP_FAIL,
    AUTH_SIGN_UP_SUCCESS,
    AUTH_LOGIN,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN_SUCCESS
} from './types'

import AuthApi from '../api/mock/AuthApi'

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

        const result = AuthApi.signUp(user)

        if (result.sucess)
            signUpSuccess(dispatch, result.user)
        else
            signUpFail(dispatch, result.error)
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch({ type: AUTH_LOGIN })

        AuthApi.login(email, password)
            .then(result => {
                if (result.sucess)
                    loginSuccess(dispatch, result.user)
                else
                    loginFail(dispatch, result.error)
            })
    }
}