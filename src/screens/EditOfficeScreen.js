import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native'

class EditOfficeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>The office will be editable here (blank if wanna add)</Text>
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

export default EditOfficeScreen