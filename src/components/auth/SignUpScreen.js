import React, { Component } from 'react'
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
    Picker,
    Form,
    Body,
    Title,
    Input,
    Text,
    Item,
} from 'native-base'

import Loading from '../common/Loading'

import { signUp } from '../../redux/actions/AuthActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'

class SignUpScreen extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        type: 'tenant',
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

    onChangeName = name => this.setState({ name })
    onChangeEmail = email => this.setState({ email })
    onChangePassword = password => this.setState({ password })
    onChangeType = type => this.setState({ type })

    onGoBack = () => Actions.pop()

    onPressSignUp = () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            type: this.state.type
        }

        this.props.signUp(user)
    }

    renderAppName = () => (
        <CardItem header>
            <Body>
                <Title style={styles.title}>Find Office</Title>
            </Body>
        </CardItem>
    )

    renderName = () => (
        <Item>
            <Input
                placeholder='Name'
                onChangeText={this.onChangeName}
                value={this.state.name}
            />
        </Item>
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

    renderSignUpButton = () => (
        <Button style={styles.button} onPress={this.onPressSignUp}>
            <Label style={styles.buttonLabel}>Sign Up</Label>
        </Button>
    )

    renderButtons = () => (
        <CardItem footer>
            <Body style={styles.buttonsBody}>
                {this.renderSignUpButton()}
            </Body>
        </CardItem>
    )

    renderInputForm = () => (
        <CardItem>
            <Body>
                <Form style={{ alignSelf: 'stretch' }}>
                    {this.renderName()}
                    {this.renderEmail()}
                    {this.renderPassword()}
                    {this.renderUserType()}
                </Form>
            </Body>
        </CardItem>
    )

    renderErrorText = () => (
        <Text style={styles.errorText}>{this.state.errorSigningUp}</Text>
    )

    render() {
        const { loading } = this.state

        if (loading)
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
    errorSigningUp: state.AuthReducer.errorSigningUp
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
        height: 370
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
        justifyContent: 'space-around',
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
    { signUp }
)(SignUpScreen)