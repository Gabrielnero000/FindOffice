import {
    FETCH_TENANT_OFFICES,
    FETCH_TENANT_OFFICES_FAIL,
    FETCH_TENANT_OFFICES_SUCCESS,
    SEARCH_OFFICES,
    SEARCH_OFFICES_FAIL,
    SEARCH_OFFICES_SUCCESS,
    FETCH_RENTS,
    FETCH_RENTS_FAIL,
    FETCH_RENTS_SUCCESS,
    GET_OFFICE_OCCUPATION,
    GET_OFFICE_OCCUPATION_FAIL,
    GET_OFFICE_OCCUPATION_SUCCESS,
    RENT,
    RENT_FAIL,
    RENT_SUCCESS,
    CHECK_IN,
    CHECK_IN_FAIL,
    CHECK_IN_SUCCESS,
    CHECK_OUT,
    CHECK_OUT_FAIL,
    CHECK_OUT_SUCCESS,
    SCORE_RENT,
    SCORE_RENT_FAIL,
    SCORE_RENT_SUCCESS
} from './types'


import TenantApi from '../../api/TenantApi'

import { Actions } from 'react-native-router-flux'

import { Popup } from 'popup-ui'


const fetchOfficesFail = (dispatch, error) => {
    dispatch({
        type: FETCH_TENANT_OFFICES_FAIL,
        reason: error
    })
}

const fetchOfficesSuccess = (dispatch, offices) => {
    dispatch({
        type: FETCH_TENANT_OFFICES_SUCCESS,
        payload: offices
    })
}

const searchOfficesFail = (dispatch, error) => {
    dispatch({
        type: SEARCH_OFFICES_FAIL,
        reason: error
    })
}

const searchOfficesSuccess = (dispatch, offices) => {
    dispatch({
        type: SEARCH_OFFICES_SUCCESS,
        payload: offices
    })

    Actions.searchResult()
}

const fetchRentsFail = (dispatch, error) => {
    dispatch({
        type: FETCH_RENTS_FAIL,
        reason: error
    })
}

const fetchRentsSuccess = (dispatch, rents) => {
    dispatch({
        type: FETCH_RENTS_SUCCESS,
        payload: rents
    })
}

const getOfficeOccupationFail = (dispatch, error) => {
    dispatch({
        type: GET_OFFICE_OCCUPATION_FAIL,
        reason: error
    })
}

const getOfficeOccupationSuccess = (dispatch, days) => {
    dispatch({
        type: GET_OFFICE_OCCUPATION_SUCCESS,
        payload: days
    })
}

const rentFail = (dispatch, error) => {
    dispatch({
        type: RENT_FAIL,
        reason: error
    })
}

const rentSuccess = dispatch => {
    dispatch({
        type: RENT_SUCCESS,
    })

    Actions.reset('tenant')
}

const checkInFail = (dispatch, error) => {
    dispatch({
        type: CHECK_IN_FAIL,
        reason: error
    })

    Popup.show({
        type: 'Danger',
        title: 'Failed to check in',
        textBody: error,
        buttonText: 'Ok',
        callback: () => {
            Popup.hide()
        }
    })
}

const checkInSuccess = dispatch => {
    dispatch({
        type: CHECK_IN_SUCCESS,
    })

    Actions.reset('tenant')
}

const checkOutFail = (dispatch, error) => {
    dispatch({
        type: CHECK_OUT_FAIL,
        reason: error
    })

    Popup.show({
        type: 'Danger',
        title: 'Failed to check out',
        textBody: error,
        buttonText: 'Ok',
        callback: () => {
            Popup.hide()
        }
    })
}

const checkOutSuccess = dispatch => {
    dispatch({
        type: CHECK_OUT_SUCCESS,
    })

    Actions.reset('tenant')
}

const scoreRentFail = (dispatch, error) => {
    dispatch({
        type: SCORE_RENT_FAIL,
        reason: error
    })

    Popup.show({
        type: 'Danger',
        title: 'Failed to score rent',
        textBody: error,
        buttonText: 'Ok',
        callback: () => {
            Popup.hide()
        }
    })
}

const scoreRentSuccess = dispatch => {
    dispatch({
        type: SCORE_RENT_SUCCESS,
    })

    Actions.reset('tenant')
}

export const fetchOffices = () => {
    return dispatch => {
        dispatch({ type: FETCH_TENANT_OFFICES })

        TenantApi.fetchOffices()
            .then(result => result.success ? fetchOfficesSuccess(dispatch, result.offices) : fetchOfficesFail(dispatch, result.error))
            .catch(error => fetchOfficesFail(dispatch, error.error))
    }
}

export const searchOffices = filter => {
    return dispatch => {
        dispatch({ type: SEARCH_OFFICES })

        TenantApi.searchOffices(filter)
            .then(result => result.success ? searchOfficesSuccess(dispatch, result.offices) : searchOfficesFail(dispatch, result.error))
            .catch(error => searchOfficesFail(dispatch, error.error))
    }
}

export const fetchRents = tenant_id => {
    return dispatch => {
        dispatch({ type: FETCH_RENTS })

        TenantApi.fetchRents(tenant_id)
            .then(result => result.success ? fetchRentsSuccess(dispatch, result.rents) : fetchRentsFail(dispatch, result.error))
            .catch(error => fetchRentsFail(dispatch, error.error))
    }
}

export const getOfficeOccupation = (office_id, month) => {
    return dispatch => {
        dispatch({ type: GET_OFFICE_OCCUPATION })

        TenantApi.getOfficeOccupation(office_id, month)
            .then(result => result.success ? getOfficeOccupationSuccess(dispatch, result.days) : getOfficeOccupationFail(dispatch, result.error))
            .catch(error => getOfficeOccupationFail(dispatch, error.error))
    }
}

export const rent = (office_id, tenant_id, rent_days) => {
    return dispatch => {
        dispatch({ type: RENT })

        TenantApi.rent(office_id, tenant_id, rent_days)
            .then(result => result.success ? rentSuccess(dispatch) : rentFail(dispatch, result.error))
            .catch(error => rentFail(dispatch, error.error))
    }
}

export const checkIn = rent_id => {
    return dispatch => {
        dispatch({ type: CHECK_IN })

        TenantApi.checkIn(rent_id)
            .then(result => result.success ? checkInSuccess(dispatch) : checkInFail(dispatch, result.error))
            .catch(error => checkInFail(dispatch, error.error))
    }
}

export const checkOut = rent_id => {
    return dispatch => {
        dispatch({ type: CHECK_OUT })

        TenantApi.checkOut(rent_id)
            .then(result => result.success ? checkOutSuccess(dispatch) : checkOutFail(dispatch, result.error))
            .catch(error => checkOutFail(dispatch, error.error))
    }
}

export const scoreRent = (rent_id, score) => {
    return dispatch => {
        dispatch({ type: SCORE_RENT })

        TenantApi.scoreRent(rent_id, score)
            .then(result => result.success ? scoreRentSuccess(dispatch) : scoreRentFail(dispatch, result.error))
            .catch(error => scoreRentFail(dispatch, error.error))
    }
}