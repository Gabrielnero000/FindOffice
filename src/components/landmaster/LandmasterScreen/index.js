import React, { Component } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import {
    Header,
    Tab,
    Tabs,
    Body,
    Title,
    Container,
    Content,
} from 'native-base'


import OfficesScreen from './OfficesScreen'
import StatsScreen from './StatsScreen'

class LandmasterScreen extends Component {

    renderHeader = () => {
        return (
            <Header hasTabs noLeft>
                <Body>
                    <Title>Find Office</Title>
                </Body>
            </Header>
        )
    }

    renderTabs = () => (
        <Tabs initialPage={0}>
            <Tab heading="My Offices">
                <OfficesScreen />
            </Tab>
            <Tab heading="Stats">
                <StatsScreen />
            </Tab>
        </Tabs>
    )

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.content}>
                    {this.renderHeader()}
                    {this.renderTabs()}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    }
})


export default LandmasterScreen