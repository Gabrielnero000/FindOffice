import {
    FETCH_TENANT_OFFICES,
    FETCH_TENANT_OFFICES_FAIL,
    FETCH_TENANT_OFFICES_SUCCESS,
    ADD_OFFICE,
    ADD_OFFICE_FAIL,
    ADD_OFFICE_SUCCESS
} from './types'


import TenantApi from '../../api/TenantApi'


const fetchTenantOfficesFail = (dispatch, error) => {
    dispatch({
        type: FETCH_TENANT_OFFICES_FAIL,
        reason: error
    })
}

const fetchTenantOfficesSuccess = (dispatch, offices) => {
    dispatch({
        type: FETCH_TENANT_OFFICES_SUCCESS,
        payload: offices
    })
}

const addOfficeFail = (dispatch, error) => {
    dispatch({
        type: ADD_OFFICE_FAIL,
        reason: error
    })
}

const addOfficeSuccess = (dispatch, offices) => {
    dispatch({
        type: ADD_OFFICE_SUCCESS,
        payload: offices
    })
}


export const fetchTenantOffices = tenant_id => {
    return dispatch => {
        dispatch({ type: FETCH_TENANT_OFFICES })

        TenantApi.fetchTenantOffices(tenant_id)
            .then(result => result.success ? fetchTenantOfficesSuccess(dispatch, result.offices) : fetchTenantOfficesFail(dispatch, result.error))
            .catch(error => fetchTenantOfficesFail(dispatch, error.error))
    }
}

export const addOffice = office => {
    return dispatch => {
        dispatch({ type: ADD_OFFICE })

        TenantApi.addOffice(office)
            .then(result => result.success ? addOfficeSuccess(dispatch, result.offices) : addOfficeFail(dispatch, result.error))
            .catch(error => addOfficeFail(dispatch, error.error))
    }
}