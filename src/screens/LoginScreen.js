import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
} from 'react-native'

import Button from '../components/common/Button'

import { Actions } from 'react-native-router-flux'

class HomeScreen extends Component {
    onPressUser = () => Actions.user()
    onPressTentant = () => Actions.tenant()
    onPressSignUp = () => Actions.signUp()

    render() {
        return (
            <View style={styles.container}>
                <Text>Initial login screen</Text>
                <Button text='Login User' onPress={this.onPressUser}/>
                <Button text='Login Tenant' onPress={this.onPressTentant}/>
                <Button text='Sign Up' onPress={this.onPressSignUp}/>
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


export default HomeScreen