import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'

import RootReducer from './redux/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import Loading from './components/common/Loading'

import RouterComponent from './Router'
import * as Font from 'expo-font'


class App extends Component {
    state = {
        loading: true
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        })

        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading)
            return (
                <Container>
                    <Content contentContainerStyle={styles.container}>
                        <Loading />
                    </Content>
                </Container>
            )


        return (
            <Provider store={createStore(RootReducer, {}, applyMiddleware(ReduxThunk))}>
                <RouterComponent />
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default App