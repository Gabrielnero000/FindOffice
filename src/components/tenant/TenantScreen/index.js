import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native'

import {
    Container,
    Content,
    Header,
    Tab,
    Tabs,
    Right,
    Body,
    Icon,
    Button,
    Title,
} from 'native-base'

import { Actions } from 'react-native-router-flux'

import OfficesScreen from './OfficesScreen'
import RentsScreen from './RentsScreen'

class HomeScreen extends Component {
    onPressSearch = () => Actions.search()

    renderHeader = () => {
        return (
            <Header hasTabs noLeft>
                <Body>
                    <Title>Find Office</Title>
                </Body>
                <Right>
                    <Button transparent onPress={this.onPressSearch}>
                        <Icon name='search' />
                    </Button>
                </Right>
            </Header>
        )
    }

    renderTabs = () => (
        <Tabs initialPage={0}>
            <Tab heading='Offices'>
                <OfficesScreen />
            </Tab>
            <Tab heading='Rents'>
                <RentsScreen />
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

export default HomeScreen