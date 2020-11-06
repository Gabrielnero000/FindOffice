import React, { Component } from 'react';
import {
    View,
    Text, 
    StyleSheet
} from 'react-native'

class OfficeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>The office informations will appear here</Text>
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

export default OfficeScreen