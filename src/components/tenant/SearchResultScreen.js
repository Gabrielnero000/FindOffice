import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
} from 'react-native'

import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Text
} from 'native-base'

import Office from '../common/Office'

import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'


class SearchResultScreen extends Component {
    onPressOffice = office => Actions.booking({ office })

    renderHeader = () => (
        <Header hasTabs noLeft>
            <Body>
                <Title>Results</Title>
            </Body>
        </Header>
    )

    renderOffice = ({ item: office }) => (
        <Office
            onPress={() => this.onPressOffice(office)}
            office={office}
        />
    )

    renderOffices = () => (
        <FlatList
            keyExtractor={office => office.officeId.toString()}
            data={this.props.searchResult}
            renderItem={this.renderOffice}
        />
    )

    renderEmptyText = () => (
        <Text>Any office match the search.</Text>
    )

    render() {
        if (this.props.searchResult.length == 0)
            return (
                <Container>
                    {this.renderHeader()}
                    <Content contentContainerStyle={styles.content}>
                        {this.renderEmptyText()}
                    </Content>
                </Container>
            )

        return (
            <Container>
                {this.renderHeader()}
                {this.renderOffices()}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    searchResult: state.TenantReducer.searchResult
})

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default connect(
    mapStateToProps,
    {}
)(SearchResultScreen)