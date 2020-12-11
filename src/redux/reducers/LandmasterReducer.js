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
} from '../actions/types'

const initialState = {
    errorFetching: '',
    errorAdding: '',
    errorModifying: '',
    errorExcluding: '',
    errorStats: '',
    loading: false,
    offices: [],
    totalOnMonth: [],
    avgOnMonths: [],
    topScoreOffice: [],
    topRentsOffice: [],
    topValueOffice: [],
    monthRents: [],
}

const LandmasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LANDMASTER_OFFICES:
            return { ...initialState, loading: true }
        case FETCH_LANDMASTER_OFFICES_FAIL:
            return { ...state, loading: false, errorFetching: action.reason }
        case FETCH_LANDMASTER_OFFICES_SUCCESS:
            return { ...state, loading: false, offices: action.payload }
        case ADD_OFFICE:
            return { ...initialState, loading: true }
        case ADD_OFFICE_FAIL:
            return { ...state, loading: false, errorAdding: action.reason }
        case ADD_OFFICE_SUCCESS:
            return { ...state, loading: false, errorFetching: '' }
        case MODIFY_OFFICE:
            return { ...initialState, loading: true }
        case MODIFY_OFFICE_FAIL:
            return { ...state, loading: false, errorModifying: action.reason }
        case MODIFY_OFFICE_SUCCESS:
            return { ...state, loading: false, errorModifying: '' }
        case EXCLUDE_OFFICE:
            return { ...initialState, loading: true }
        case EXCLUDE_OFFICE_FAIL:
            return { ...state, loading: false, errorExcluding: action.reason }
        case EXCLUDE_OFFICE_SUCCESS:
            return { ...state, loading: false, errorExcluding: '' }
        case GET_AVERAGE_MONTHS:
            return { ...state, loading: true }
        case GET_AVERAGE_MONTHS_FAIL:
            return { ...state, loading: false, errorStats: action.reason }
        case GET_AVERAGE_MONTHS_SUCCESS:
            return { ...state, loading: false, errorStats: '', avgOnMonths: [action.payload] }
        case GET_TOTAL_MONTH:
            return { ...state, loading: true }
        case GET_TOTAL_MONTH_FAIL:
            return { ...state, loading: false, errorStats: action.reason }
        case GET_TOTAL_MONTH_SUCCESS:
            return { ...state, loading: false, errorStats: '', totalOnMonth: [action.payload] }
        case GET_TOP_SCORE_OFFICE:
            return { ...state, loading: true }
        case GET_TOP_SCORE_OFFICE_FAIL:
            return { ...state, loading: false, errorStats: action.reason }
        case GET_TOP_SCORE_OFFICE_SUCCESS:
            return { ...state, loading: false, errorStats: '', topScoreOffice: action.payload }
        case GET_TOP_RENTS_OFFICE:
            return { ...state, loading: true }
        case GET_TOP_RENTS_OFFICE_FAIL:
            return { ...state, loading: false, errorStats: action.reason }
        case GET_TOP_RENTS_OFFICE_SUCCESS:
            return { ...state, loading: false, errorStats: '', topRentsOffice: action.payload }
        case GET_TOP_VALUE_OFFICE:
            return { ...state, loading: true }
        case GET_TOP_VALUE_OFFICE_FAIL:
            return { ...state, loading: false, errorStats: action.reason }
        case GET_TOP_VALUE_OFFICE_SUCCESS:
            return { ...state, loading: false, errorStats: '', topValueOffice: action.payload }
        case GET_MONTH_RENTS:
            return { ...state, loading: true }
        case GET_MONTH_RENTS_FAIL:
            return { ...state, loading: false, errorStats: action.reason }
        case GET_MONTH_RENTS_SUCCESS:
            return { ...state, loading: false, errorStats: '', monthRents: action.payload }
        default:
            return state
    }
}

export default LandmasterReducer