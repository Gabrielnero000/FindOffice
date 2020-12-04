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
} from '../actions/types'

const initialState = {
    errorFetching: '',
    errorSearching: '',
    loading: false,
    offices: [],
    searchResult: [],
    rents: {}
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
            return { ...initialState, loading: true }
        case SEARCH_OFFICES_FAIL:
            return { ...state, errorSearching: action.reason, loading: false }
        case SEARCH_OFFICES_SUCCESS:
            return { ...state, loading: false, searchResult: action.payload }
        case FETCH_RENTS:
            return { ...initialState, loading: true }
        case FETCH_RENTS_FAIL:
            return { ...state, errorFetching: action.reason, loading: false }
        case FETCH_RENTS_SUCCESS:
            return { ...state, loading: false, rents: action.payload }
        default:
            return state
    }
}

export default TenantReducer