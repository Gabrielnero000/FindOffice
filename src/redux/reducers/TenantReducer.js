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
} from '../actions/types'

const initialState = {
    loading: false,
    errorFetching: '',
    errorSearching: '',
    errorGettingOccupation: '',
    errorRenting: '',
    errorCheckin: '',
    errorCheckout: '',
    errorScoring: '',
    offices: [],
    searchResult: [],
    rents: {
        no_checkIn: [],
        no_checkOut: [],
        no_scoring: [],
        past_rents: []
    },
    unaviable_days: []
}

const TenantReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TENANT_OFFICES:
            return { ...initialState, loading: true }
        case FETCH_TENANT_OFFICES_FAIL:
            return { ...state, errorFetching: action.reason, loading: false }
        case FETCH_TENANT_OFFICES_SUCCESS:
            return { ...state, loading: false, offices: action.payload }
        case SEARCH_OFFICES:
            return { ...state, loading: true }
        case SEARCH_OFFICES_FAIL:
            return { ...state, errorSearching: action.reason, loading: false }
        case SEARCH_OFFICES_SUCCESS:
            return { ...state, loading: false, searchResult: action.payload }
        case FETCH_RENTS:
            return { ...state, loading: true }
        case FETCH_RENTS_FAIL:
            return { ...state, errorFetching: action.reason, loading: false }
        case FETCH_RENTS_SUCCESS:
            return { ...state, loading: false, rents: action.payload }
        case GET_OFFICE_OCCUPATION:
            return { ...state, loading: true }
        case GET_OFFICE_OCCUPATION_FAIL:
            return { ...state, errorGettingOccupation: action.reason, loading: false }
        case GET_OFFICE_OCCUPATION_SUCCESS:
            return { ...state, loading: false, unaviable_days: action.payload }
        case RENT:
            return { ...state, loading: true }
        case RENT_FAIL:
            return { ...state, errorRenting: action.reason, loading: false }
        case RENT_SUCCESS:
            return { ...state, loading: false }
        case CHECK_IN:
            return { ...state, loading: true }
        case CHECK_IN_FAIL:
            return { ...state, errorCheckin: action.reason, loading: false }
        case CHECK_IN_SUCCESS:
            return { ...state, loading: false }
        case CHECK_OUT:
            return { ...state, loading: true }
        case CHECK_OUT_FAIL:
            return { ...state, errorCheckout: action.reason, loading: false }
        case CHECK_OUT_SUCCESS:
            return { ...state, loading: false }
        case SCORE_RENT:
            return { ...state, loading: true }
        case SCORE_RENT_FAIL:
            return { ...state, errorScoring: action.reason, loading: false }
        case SCORE_RENT_SUCCESS:
            return { ...state, loading: false }
        default:
            return state
    }
}

export default TenantReducer