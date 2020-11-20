import React, { Component } from 'react'
import { View } from 'react-native'

import RootReducer from './redux/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import RouterComponent from './Router'


class App extends Component {
    render() {
        return (
            <Provider store={createStore(RootReducer, {}, applyMiddleware(ReduxThunk))}>
                <View style={{ flex: 1 }}>
                    <RouterComponent />
                </View>
            </Provider>
        )
    }
}

export default App