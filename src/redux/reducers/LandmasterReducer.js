import {
    FETCH_LANDMASTER_OFFICES,
    FETCH_LANDMASTER_OFFICES_FAIL,
    FETCH_LANDMASTER_OFFICES_SUCCESS,
    ADD_OFFICE,
    ADD_OFFICE_FAIL,
    ADD_OFFICE_SUCCESS
} from '../actions/types'

const initialState = {
    errorFetching: '',
    errorAdding: '',
    loading: false,
    offices: []
}

const LandmasterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LANDMASTER_OFFICES:
            return {...initialState, loading: true}
        case FETCH_LANDMASTER_OFFICES_FAIL:
            return {...state, loading: false, errorFetching: action.reason}
        case FETCH_LANDMASTER_OFFICES_SUCCESS:
            return {...state, loading: false, offices: action.payload}
        case ADD_OFFICE:
            return {...initialState, loading: true}
        case ADD_OFFICE_FAIL:
            return {...state, loading: false, errorAdding: action.reason}
        case ADD_OFFICE_SUCCESS:
            return {...state, loading: false, errorFetching: ''}
        default: 
            return state
    }   
}

export default LandmasterReducer