import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'

const RootReducer = combineReducers({
    AuthReducer,
    UserReducer
})

export default RootReducer