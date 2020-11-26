import {
    FETCH_TENANT_OFFICES,
    FETCH_TENANT_OFFICES_FAIL,
    FETCH_TENANT_OFFICES_SUCCESS
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

export const fetchTenantOffices = tenant_id => {
    return dispatch => {
        dispatch({ type: FETCH_TENANT_OFFICES })

        TenantApi.fetchTenantOffices(tenant_id)
            .then(result => result.success ? fetchTenantOfficesSuccess(dispatch, result.offices) : fetchTenantOfficesFail(dispatch, result.error))
            .catch(error => fetchTenantOfficesFail(dispatch, error.error))
    }
}