import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native'

import {
    Container,
    Content,
    Button,
    Label,
    Card,
    CardItem,
    Form,
    Picker,
    Body,
    Title,
    Input,
    Text,
    Item,
} from 'native-base'

import Loading from '../common/Loading'

import { login } from '../../redux/actions/AuthActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'

class LoginScreen extends Component {
    state = {
        email: '',
        password: '',
        type: 'tenant',
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
        const { email, password, type } = this.state
        this.props.login(email, password, type)
    }

    onPressSignUp = () => Actions.signUp()

    onChangeEmail = email => this.setState({ email })
    onChangePassword = password => this.setState({ password })
    onChangeType = type => this.setState({ type })


    renderAppName = () => (
        <CardItem header>
            <Body>
                <Title style={styles.title}>Find Office</Title>
            </Body>
        </CardItem>
    )

    renderEmail = () => (
        <Item>
            <Input
                placeholder='Email'
                onChangeText={this.onChangeEmail}
                value={this.state.email}
                keyboardType='email-address'
            />
        </Item>
    )

    renderPassword = () => (
        <Item>
            <Input
                placeholder='Password'
                secureTextEntry
                onChangeText={this.onChangePassword}
                value={this.state.password}
            />
        </Item>
    )

    renderUserType = () => (
        <Item>
            <Label style={{ marginLeft: 4 }}>User type:</Label>
            <Picker
                mode='dropdown'
                selectedValue={this.state.type}
                onValueChange={this.onChangeType}
            >
                <Picker.Item label='Tenant' value='tenant' />
                <Picker.Item label='Landmaster' value='landmaster' />
            </Picker>
        </Item>

    )

    renderInputForm = () => (
        <CardItem>
            <Body>
                <Form style={{ alignSelf: 'stretch' }}>
                    {this.renderEmail()}
                    {this.renderPassword()}
                    {this.renderUserType()}
                </Form>
            </Body>
        </CardItem>
    )

    renderLoginButton = () => (
        <Button style={styles.button} onPress={this.onPressLogin}>
            <Label style={styles.buttonLabel}>Login</Label>
        </Button>
    )

    renderSignUpButton = () => (
        <Button style={styles.button} onPress={this.onPressSignUp}>
            <Label style={styles.buttonLabel}>Sign Up</Label>
        </Button>
    )

    renderButtons = () => (
        <CardItem footer>
            <Body style={styles.buttonsBody}>
                {this.renderLoginButton()}
                {this.renderSignUpButton()}
            </Body>
        </CardItem>
    )

    renderErrorText = () => (
        <Text style={styles.errorText}>{this.state.errorLoging}</Text>
    )

    render() {
        if (this.state.loading)
            return (
                <Container>
                    <Content contentContainerStyle={styles.content}>
                        <Loading />
                    </Content>
                </Container>
            )

        return (
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <Card style={styles.card}>
                        {this.renderAppName()}
                        {this.renderInputForm()}
                        {this.renderButtons()}
                    </Card>
                    {this.renderErrorText()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.AuthReducer.loading,
    errorLoging: state.AuthReducer.errorLoging
})


const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: 300,
        height: 330
    },
    title: {
        color: 'black',
        alignSelf: 'center'
    },
    button: {
        width: 100,
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'white'
    },
    buttonsBody: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 32,
    }
});


export default connect(
    mapStateToProps,
    { login }
)(LoginScreen)