import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native'

import Button from '../components/common/Button'

import { Actions } from 'react-native-router-flux'

class TenantScreen extends Component {
    onPressAdd = () => Actions.office()
    onPressEdit = () => Actions.office()

    render() {
        return (
            <View style={styles.container}>
                <Text>This is the home screen of a tenant</Text>
                <Button text='Add Office' onPress={this.onPressAdd}/>
                <Button text='Edit Office' onPress={this.onPressEdit}/>
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

export default TenantScreen