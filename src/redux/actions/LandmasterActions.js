import {
    FETCH_LANDMASTER_OFFICES,
    FETCH_LANDMASTER_OFFICES_FAIL,
    FETCH_LANDMASTER_OFFICES_SUCCESS,
    ADD_OFFICE,
    ADD_OFFICE_FAIL,
    ADD_OFFICE_SUCCESS,
    MODIFY_OFFICE,
    MODIFY_OFFICE_FAIL,
    MODIFY_OFFICE_SUCCESS,
    EXCLUDE_OFFICE,
    EXCLUDE_OFFICE_FAIL,
    EXCLUDE_OFFICE_SUCCESS,
    GET_AVERAGE_MONTHS,
    GET_AVERAGE_MONTHS_FAIL,
    GET_AVERAGE_MONTHS_SUCCESS,
    GET_TOTAL_MONTH,
    GET_TOTAL_MONTH_FAIL,
    GET_TOTAL_MONTH_SUCCESS,
    GET_TOP_SCORE_OFFICE,
    GET_TOP_SCORE_OFFICE_FAIL,
    GET_TOP_SCORE_OFFICE_SUCCESS,
    GET_TOP_RENTS_OFFICE,
    GET_TOP_RENTS_OFFICE_FAIL,
    GET_TOP_RENTS_OFFICE_SUCCESS,
    GET_TOP_VALUE_OFFICE,
    GET_TOP_VALUE_OFFICE_FAIL,
    GET_TOP_VALUE_OFFICE_SUCCESS,
    GET_MONTH_RENTS,
    GET_MONTH_RENTS_FAIL,
    GET_MONTH_RENTS_SUCCESS
} from './types'

import LandmasterApi from '../../api/LandmasterApi'

import { Actions } from 'react-native-router-flux'

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

const addOfficeSuccess = dispatch => {
    dispatch({
        type: ADD_OFFICE_SUCCESS,
    })

    Actions.reset('landmaster')
}

const modifyOfficeFail = (dispatch, error) => {
    dispatch({
        type: MODIFY_OFFICE_FAIL,
        reason: error
    })
}

const modifyOfficeSuccess = dispatch => {
    dispatch({
        type: MODIFY_OFFICE_SUCCESS,
    })

    Actions.reset('landmaster')
}

const excludeOfficeFail = (dispatch, error) => {
    dispatch({
        type: EXCLUDE_OFFICE_FAIL,
        reason: error
    })
}

const excludeOfficeSuccess = dispatch => {
    dispatch({
        type: EXCLUDE_OFFICE_SUCCESS,
    })

    Actions.reset('landmaster')
}

const getAverageMonthsFail = (dispatch, error) => {
    dispatch({
        type: GET_AVERAGE_MONTHS_FAIL,
        reason: error
    })
}

const getAverageMonthsSuccess = (dispatch, value) => {
    dispatch({
        type: GET_AVERAGE_MONTHS_SUCCESS,
        payload: value
    })
}

const getTotalMonthFail = (dispatch, error) => {
    dispatch({
        type: GET_TOTAL_MONTH_FAIL,
        reason: error
    })
}

const getTotalMonthSuccess = (dispatch, value) => {
    dispatch({
        type: GET_TOTAL_MONTH_SUCCESS,
        payload: value
    })
}

const getTopScoreOfficeFail = (dispatch, error) => {
    dispatch({
        type: GET_TOP_SCORE_OFFICE_FAIL,
        reason: error
    })
}

const getTopScoreOfficeSuccess = (dispatch, office) => {
    dispatch({
        type: GET_TOP_SCORE_OFFICE_SUCCESS,
        payload: office
    })
}

const getTopRentsOfficeFail = (dispatch, error) => {
    dispatch({
        type: GET_TOP_RENTS_OFFICE_FAIL,
        reason: error
    })
}

const getTopRentsOfficeSuccess = (dispatch, office) => {
    dispatch({
        type: GET_TOP_RENTS_OFFICE_SUCCESS,
        payload: office
    })
}

const getTopValueOfficeFail = (dispatch, error) => {
    dispatch({
        type: GET_TOP_VALUE_OFFICE_FAIL,
        reason: error
    })
}

const getTopValueOfficeSuccess = (dispatch, office) => {
    dispatch({
        type: GET_TOP_VALUE_OFFICE_SUCCESS,
        payload: office
    })
}

const getMonthRentsFail = (dispatch, error) => {
    dispatch({
        type: GET_MONTH_RENTS_FAIL,
        reason: error
    })
}

const getMonthRentsSuccess = (dispatch, rents) => {
    dispatch({
        type: GET_MONTH_RENTS_SUCCESS,
        payload: rents
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
            .then(result => result.success ? addOfficeSuccess(dispatch) : addOfficeFail(dispatch, result.error))
            .catch(error => addOfficeFail(dispatch, error.error))
    }
}

export const modifyOffice = office => {
    return dispatch => {
        dispatch({ type: MODIFY_OFFICE })

        LandmasterApi.modifyOffice(office)
            .then(result => result.success ? modifyOfficeSuccess(dispatch) : modifyOfficeFail(dispatch, result.error))
            .catch(error => modifyOfficeFail(dispatch, error.error))
    }
}

export const excludeOffice = office_id => {
    return dispatch => {
        dispatch({ type: EXCLUDE_OFFICE })

        LandmasterApi.excludeOffice(office_id)
            .then(result => result.success ? excludeOfficeSuccess(dispatch) : excludeOfficeFail(dispatch, result.error))
            .catch(error => excludeOfficeFail(dispatch, error.error))
    }
}

export const getAverageMonths = tenant_id => {
    return dispatch => {
        dispatch({ type: GET_AVERAGE_MONTHS })

        LandmasterApi.getAverageOnMonths(tenant_id)
            .then(result => result.success ? getAverageMonthsSuccess(dispatch, result.month_average) : getAverageMonthsFail(dispatch, result.error))
            .catch(error => getAverageMonthsFail(dispatch, error.error))
    }
}

export const getTotalMonth = tenant_id => {
    return dispatch => {
        dispatch({ type: GET_TOTAL_MONTH })

        LandmasterApi.getTotalOnMonth(tenant_id)
            .then(result => result.success ? getTotalMonthSuccess(dispatch, result.value) : getTotalMonthFail(dispatch, result.error))
            .catch(error => getTotalMonthFail(dispatch, error.error))
    }
}

export const getTopScoreOffice = tenant_id => {
    return dispatch => {
        dispatch({ type: GET_TOP_SCORE_OFFICE })

        LandmasterApi.getTopScoreOffice(tenant_id)
            .then(result => result.success ? getTopScoreOfficeSuccess(dispatch, result.office) : getTopScoreOfficeFail(dispatch, result.error))
            .catch(error => getTopScoreOfficeFail(dispatch, error.error))
    }
}

export const getTopRentsOffice = tenant_id => {
    return dispatch => {
        dispatch({ type: GET_TOP_RENTS_OFFICE })

        LandmasterApi.getTopRentsOffice(tenant_id)
            .then(result => result.success ? getTopRentsOfficeSuccess(dispatch, result.office) : getTopRentsOfficeFail(dispatch, result.error))
            .catch(error => getTopRentsOfficeFail(dispatch, error.error))
    }
}

export const getTopValueOffice = tenant_id => {
    return dispatch => {
        dispatch({ type: GET_TOP_VALUE_OFFICE })

        LandmasterApi.getTopValueOffice(tenant_id)
            .then(result => result.success ? getTopValueOfficeSuccess(dispatch,  result.office) : getTopValueOfficeFail(dispatch, result.error))
            .catch(error => getTopValueOfficeFail(dispatch, error.error))
    }
}

export const getMonthRents = tenant_id => {
    return dispatch => {
        dispatch({ type: GET_MONTH_RENTS })

        LandmasterApi.getMonthRents(tenant_id)
            .then(result => result.success ? getMonthRentsSuccess(dispatch, result.rents) : getMonthRentsFail(dispatch, result.error))
            .catch(error => getMonthRentsFail(dispatch, error.error))
    }
}