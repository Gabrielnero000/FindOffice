import {
    FETCH_LANDMASTER_OFFICES,
    FETCH_LANDMASTER_OFFICES_FAIL,
    FETCH_LANDMASTER_OFFICES_SUCCESS,
    ADD_OFFICE,
    ADD_OFFICE_FAIL,
    ADD_OFFICE_SUCCESS
} from './types'


import LandmasterApi from '../../api/LandmasterApi'


const fetchLandmasterOfficesFail = (dispatch, error) => {
    dispatch({
        type: FETCH_LANDMASTER_OFFICES_FAIL,
        reason: error
    })
}

const fetchLandmasterOfficesSuccess = (dispatch, offices) => {
    dispatch({
        type: FETCH_LANDMASTER_OFFICES_SUCCESS,
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


export const fetchLandmasterOffices = landmaster_id => {
    return dispatch => {
        dispatch({ type: FETCH_LANDMASTER_OFFICES })

        LandmasterApi.fetchLandmasterOffices(landmaster_id)
            .then(result => result.success ? fetchLandmasterOfficesSuccess(dispatch, result.offices) : fetchLandmasterOfficesFail(dispatch, result.error))
            .catch(error => fetchLandmasterOfficesFail(dispatch, error.error))
    }
}

export const addOffice = office => {
    return dispatch => {
        dispatch({ type: ADD_OFFICE })

        LandmasterApi.addOffice(office)
            .then(result => result.success ? addOfficeSuccess(dispatch, result.offices) : addOfficeFail(dispatch, result.error))
            .catch(error => addOfficeFail(dispatch, error.error))
    }
}