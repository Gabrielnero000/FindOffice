import {
    FETCH_TENANT_OFFICES,
    FETCH_TENANT_OFFICES_FAIL,
    FETCH_TENANT_OFFICES_SUCCESS,
    SEARCH_OFFICES,
    SEARCH_OFFICES_FAIL,
    SEARCH_OFFICES_SUCCESS,
    FETCH_RENTS,
    FETCH_RENTS_FAIL,
    FETCH_RENTS_SUCCESS
} from './types'


import TenantApi from '../../api/TenantApi'


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
            .then(result => result.success ? fetchRentsSuccess(dispatch, result.offices) : fetchRentsFail(dispatch, result.error))
            .catch(error => fetchRentsFail(dispatch, error.error))
    }
}