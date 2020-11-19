import React, { Component } from 'react'
import { View } from 'react-native'

import { Provider } from 'react-redux'
import Store from './redux/store/Store'

import RouterComponent from './Router'


class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <View style={{ flex: 1 }}>
                    <RouterComponent />
                </View>
            </Provider>
        )
    }
}

export default App