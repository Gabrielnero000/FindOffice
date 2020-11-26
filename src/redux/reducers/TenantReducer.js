import {
    FETCH_TENANT_OFFICES,
    FETCH_TENANT_OFFICES_FAIL,
    FETCH_TENANT_OFFICES_SUCCESS
} from '../actions/types'

const initialState = {
    errorFetching: '',
    loading: false,
    offices: []
}

const TenantReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TENANT_OFFICES:
            return {...initialState, loading: true}
        case FETCH_TENANT_OFFICES_FAIL:
            return {...state, errorFetching: action.reason, loading: false}
        case FETCH_TENANT_OFFICES_SUCCESS:
            return {...state, loading: false, offices: action.payload}
        default: 
            return state
    }   
}

export default TenantReducer