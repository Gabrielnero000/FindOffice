import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'
import TenantReducer from './TenantReducer'

const RootReducer = combineReducers({
    AuthReducer,
    UserReducer,
    TenantReducer
})

export default RootReducer