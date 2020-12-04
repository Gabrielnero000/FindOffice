import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import TenantReducer from './TenantReducer'
import LandmasterReducer from './LandmasterReducer'

const RootReducer = combineReducers({
    AuthReducer,
    TenantReducer,
    LandmasterReducer
})

export default RootReducer