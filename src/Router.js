import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import {
    LoginScreen,
    SignUpScreen,
    HomeScreen,
    SearchScreen,
    BookingScreen,
    LandmasterScreen,
    EditOfficeScreen
} from './components'

const RouterComponent = () => (
    <Router>
        <Stack key='root'>
            <Stack key='auth' hideNavBar>
                <Scene key='login' component={LoginScreen} />
                <Scene key='signUp' component={SignUpScreen} />
            </Stack>
            <Stack key='tenant' hideNavBar>
                <Scene key='tenantHome' component={HomeScreen} />
                <Scene key='search' component={SearchScreen} />
                <Scene key='booking' component={BookingScreen} />
            </Stack>
            <Stack key='landmaster' hideNavBar>
                <Scene key='landmasterHome' component={LandmasterScreen} />
                <Scene key='landmasterOffice' component={EditOfficeScreen} />
            </Stack>
        </Stack>
    </Router>
)

export default RouterComponent