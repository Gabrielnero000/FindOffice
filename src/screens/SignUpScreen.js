import React, { Component } from 'react'
import { 
    View, 
    Text,
    StyleSheet,
} from 'react-native'

import Button from '../components/common/Button'

import { Actions } from 'react-native-router-flux'

class SignUpScreen extends Component {
    onPressUser = () => Actions.user()
    onPressTentant = () => Actions.tenant()

    render() {
        return (
            <View style={styles.container}>
                <Text>Login Screen</Text>
                <Button text='Sign Up as User' onPress={this.onPressUser}/>
                <Button text='Sign Up as Tenant' onPress={this.onPressTentant}/>
            </View>
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
});

export default SignUpScreen