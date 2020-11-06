import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay'

import Button from '../common/Button'
import Input from '../common/Input'
import Title from '../common/Title'

import { login } from '../../actions/AuthActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'

class LoginScreen extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errorLoging: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorLoging: this.props.errorLoging,
            })
        }
    }

    onPressLogin = () => {
        const { email, password } = this.state
        this.props.login(email, password)
    }
    onPressSignUp = () => Actions.signUp()

    onChangeEmail = text => this.setState({ email: text })
    onChangePassword = text => this.setState({ password: text })

    onPressUser = () => Actions.user()
    onPressTentant = () => Actions.tenant()

    renderLoading = loading => (
        <View>
            <Spinner visible={loading} />
        </View>
    )

    renderAppName = () => (
        <View>
            <Title title='Find Office' />
        </View>
    )

    renderInputs = (email, password) => (
        <View>
            <Input placeholder='Email' onChange={this.onChangeEmail} value={email} />
            <Input placeholder='Password' secureTextEntry onChange={this.onChangePassword} value={password} />
        </View>
    )

    renderButtons = () => (
        <View>
            <Button text='Login' onPress={this.onPressLogin} />
            <Button text='Sign Up' onPress={this.onPressSignUp} />
        </View>
    )

    renderErrorText = errorLoging => (
        <View>
            <Text style={styles.errorText}>{errorLoging}</Text>
        </View>
    )

    render() {
        const { email, password, loading, errorLoging } = this.state

        return (
            <View style={styles.container}>
                {this.renderLoading(loading)}
                {this.renderAppName()}
                {this.renderInputs(email, password)}
                {this.renderButtons()}
                {this.renderErrorText(errorLoging)}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.AuthReducer.loading,
    errorLoging: state.AuthReducer.errorLoging
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
});


export default connect(
    mapStateToProps,
    { login }
)(LoginScreen)