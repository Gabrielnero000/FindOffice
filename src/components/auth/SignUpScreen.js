import React, { Component } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay'

import {
    Button,
    Input,
    Text,
    CheckBox
} from 'react-native-elements'

import { signUp } from '../../actions/AuthActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'

class SignUpScreen extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        isTenant: false,
        isLegalPerson: false,
        cpf: '',
        cnpj: '',
        loading: false,
        errorSigningUp: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorSigningUp: this.props.errorSigningUp,
            })
        }
    }

    onChangeName = text => this.setState({ name: text })
    onChangeEmail = text => this.setState({ email: text })
    onChangePassword = text => this.setState({ password: text })
    onChangeCPF = text => this.setState({ cpf: text })
    onChangeCNPJ = text => this.setState({ cnpj: text })

    onPressTenant = () => this.setState({ isTenant: !this.state.isTenant })
    onPressLegalPerson = () => this.setState({ isLegalPerson: !this.state.isLegalPerson })

    onGoBack = () => Actions.pop()

    onPressSignUp = () => {
        const {
            name,
            email,
            password,
            isTenant,
            isLegalPerson,
            cpf,
            cnpj 
        } = this.state

        const user = {
            name,
            email,
            password,
            isTenant,
            isLegalPerson,
            cpf,
            cnpj
        }

        this.props.signUp(user)
    }

    renderLoading = loading => (
        <View>
            <Spinner visible={loading} />
        </View>
    )

    renderAppName = () => (
        <View>
            <Text h1 style={styles.title}>Find Office</Text>
        </View>
    )

    renderInputs = (name, email, password) => (
        <View>
            <Input
                containerStyle={styles.input}
                placeholder='Name'
                onChangeText={this.onChangeName}
                leftIcon={{ name: 'face' }}
                leftIconContainerStyle={styles.leftIcon}
                value={name} />
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

    renderOptions = (isTenant, isLegalPerson) => (
        <View style={styles.options}>
            <CheckBox
                title='Legal Person'
                checked={isLegalPerson}
                onPress={this.onPressLegalPerson}
            />
            <CheckBox
                title='Tenant'
                checked={isTenant}
                onPress={this.onPressTenant}
            />
        </View>
    )

    renderDocumentInput = (isLegalPerson, cpf, cnpj) => (
        <View>
            <Input
                containerStyle={styles.input}
                placeholder={isLegalPerson ? 'CNPJ' : 'CPF'}
                onChangeText={isLegalPerson ? this.onChangeCNPJ : this.onChangeCPF}
                leftIcon={{ name: 'perm-identity' }}
                leftIconContainerStyle={styles.leftIcon}
                value={isLegalPerson ? cnpj : cpf} />
        </View>
    )

    renderButtons = () => (
        <View>
            <Button title='Sign Up' onPress={this.onPressSignUp} buttonStyle={styles.button} />
        </View>
    )

    renderErrorText = errorSigningUp => (
        <View>
            <Text style={styles.errorText}>{errorSigningUp}</Text>
        </View>
    )

    render() {
        const {
            name,
            email,
            password,
            isTenant,
            isLegalPerson,
            cpf,
            cnpj,
            loading,
            errorSigningUp,
        } = this.state

        return (
            <View style={styles.container}>
                {this.renderLoading(loading)}
                {this.renderAppName()}
                {this.renderInputs(name, email, password)}
                {this.renderOptions(isTenant, isLegalPerson)}
                {this.renderDocumentInput(isLegalPerson, cpf, cnpj)}
                {this.renderButtons()}
                {this.renderErrorText(errorSigningUp)}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.AuthReducer.loading,
    errorSigningUp: state.AuthReducer.errorSigningUp
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
    options: {
        flexDirection: 'row',
        margin: 8
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
    { signUp }
)(SignUpScreen)