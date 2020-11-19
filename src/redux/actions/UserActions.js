import {
    FETCH_OFFICES,
    FETCH_OFFICES_FAIL,
    FETCH_OFFICES_SUCCESS
} from './types'


import UserApi from '../../api/UserApi'


const fetchOfficesFail = (dispatch, error) => {
    dispatch({
        type: FETCH_OFFICES_FAIL,
        reason: error
    })
}

const fetchOfficesSuccess = (dispatch, offices) => {
    dispatch({
        type: FETCH_OFFICES_SUCCESS,
        payload: offices
    })
}

export const fetchOffices = () => {
    return dispatch => {
        dispatch({ type: FETCH_OFFICES })

        UserApi.fetchOffices
            .then(result => result.success ? fetchOfficesSuccess(dispatch, result.offices) : fetchOfficesFail(dispatch, result.error))
            .catch(error => fetchOfficesFail(dispatch, error.error))
    }
}