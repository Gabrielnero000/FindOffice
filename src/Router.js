import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import {
    LoginScreen,
    SignUpScreen,
    HomeScreen,
    SearchScreen,
    OfficeScreen,
    TenantScreen,
    EditOfficeScreen
} from './components'

const RouterComponent = () => (
    <Router>
        <Stack key='root'>
            <Stack key='auth' hideNavBar>
                <Scene key='login' component={LoginScreen} />
                <Scene key='signUp' component={SignUpScreen} />
            </Stack>
            <Stack key='user' hideNavBar>
                <Scene key='home' component={HomeScreen} />
                <Scene key='search' component={SearchScreen} />
                <Scene key='office' component={OfficeScreen} />
            </Stack>
            <Stack key='tenant' hideNavBar>
                <Scene key='home' component={TenantScreen} />
                <Scene key='office' component={EditOfficeScreen} />
            </Stack>
        </Stack>
    </Router>
)

export default RouterComponent