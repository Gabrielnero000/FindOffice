import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native'

import Button from '../components/common/Button'

import { Actions } from 'react-native-router-flux'

class HomeScreen extends Component {
    onPressSearch = () => Actions.office()

    render() {

        return (
            <View style={styles.container}>
                <Text>This is the home screen of a normal user</Text>
                <Button text='Search Office' onPress={this.onPressSearch}/>
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