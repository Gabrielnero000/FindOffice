import React, { Component } from 'react'
import { View } from 'react-native'

import RootReducer from './redux/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import RouterComponent from './Router'
import Loading from './components/common/Loading'
import * as Font from 'expo-font'


class App extends Component {
    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        })
    }

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