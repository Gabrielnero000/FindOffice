import {
    FETCH_OFFICES,
    FETCH_OFFICES_FAIL,
    FETCH_OFFICES_SUCCESS
} from '../actions/types'

const initialState = {
    errorFetching: '',
    loading: false,
    offices: []
}

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_OFFICES:
            return {...initialState, loading: true}
        case FETCH_OFFICES_FAIL:
            return {...state, errorFetching: action.reason, loading: false}
        case FETCH_OFFICES_SUCCESS:
            return {...state, loading: false, offices: action.payload}
        default: 
            return state
    }   
}

export default UserReducer