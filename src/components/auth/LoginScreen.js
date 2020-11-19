import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native'

import {
    Button,
    Input,
    Text
} from 'react-native-elements'

import { login } from '../../redux/actions/AuthActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'

class LoginScreen extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errorLoging: ''
    }


    onPressLogin = () => {
        const { email, password } = this.state
        if (email.length == 0)
            Actions.user()
        else
            this.props.login(email, password)
    }
    onPressSignUp = () => Actions.signUp()

    onChangeEmail = text => this.setState({ email: text })
    onChangePassword = text => this.setState({ password: text })

    renderLoading = () => (
        <View>
            <ActivityIndicator size='large' color='#000' />
        </View>
    )

    renderAppName = () => (
        <View>
            <Text h1 style={styles.title}>Find Office</Text>
        </View>
    )

    renderInputs = (email, password) => (
        <View>
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                onChangeText={this.onChangeEmail}
                leftIcon={{ name: 'email' }}
                leftIconContainerStyle={styles.leftIcon}
                value={email} />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                secureTextEntry
                onChangeText={this.onChangePassword}
                leftIcon={{ name: 'lock' }}
                leftIconContainerStyle={styles.leftIcon}
                value={password} />
        </View>
    )

    renderButtons = () => (
        <View>
            <Button buttonStyle={styles.button} title='Login' onPress={this.onPressLogin} />
            <Button buttonStyle={styles.button} title='Sign Up' onPress={this.onPressSignUp} />
        </View>
    )

    renderErrorText = errorLoging => (
        <View>
            <Text style={styles.errorText}>{errorLoging}</Text>
        </View>
    )


    render() {
        const { email, password, loading, errorLoging } = this.state

        if (loading)
            return (
                <View style={styles.container}>
                    {this.renderLoading()}
                </View>
            )
        else
            return (
                <View style={styles.container}>
                    {this.renderAppName()}
                    {this.renderInputs(email, password, loading)}
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
        textAlign: 'center',
        marginTop: 32,
    },
    title: {
        margin: 32
    },
    input: {
        margin: 8,
        width: 350
    },
    leftIcon: {
        marginRight: 8
    },
    button: {
        margin: 8,
        width: 150
    }
});


export default connect(
    mapStateToProps,
    { login }
)(LoginScreen)