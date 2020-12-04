import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native'

import {
    Container,
    Content,
    Text,
} from 'native-base'

class StatsScreen extends Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <Text>Stats screen</Text>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default StatsScreen