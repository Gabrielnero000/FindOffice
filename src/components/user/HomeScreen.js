import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native'

import {
    Header,
    Text,
    Tab,
    Tabs,
    Right,
    Body,
    Icon,
    Button,
    Title,
} from 'native-base'

import Office from '../common/Office'
import Loading from '../common/Loading'

import { fetchOffices } from '../../redux/actions/UserActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'


class OfficesScreen extends Component {
    state = {
        loading: false,
        errorFetching: '',
        offices: []
    }

    componentDidMount() {
        this.props.fetchOffices()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorFetching: this.props.errorFetching,
                offices: this.props.offices,
            })
        }
    }

    onPressOffice = office => console.log(office)

    renderOffice = ({ item: office }) => (
        <Office
            onPress={() => this.onPressOffice(office)}
            office={office}
        />
    )

    renderOffices = offices => (
        <FlatList
            contentContainerStyle={stylesOfficeScreen.list}
            keyExtractor={office => office.officeId.toString()}
            data={offices}
            renderItem={this.renderOffice}
        />
    )

    renderEmptyText = () => (
        <View style={stylesOfficeScreen.emptyText}>
            <Text>There is no offices right now, try again later</Text>
        </View>
    )

    renderErrorText = errorFetching => (
        <View style={stylesOfficeScreen.errorText}>
            <Text>{errorFetching}</Text>
        </View>
    )

    render() {
        const { loading, errorFetching, offices } = this.state

        if (loading)
            return (
                <View style={stylesOfficeScreen.container}>
                    <Loading />
                </View>
            )

        if (errorFetching)
            return (
                <View style={stylesOfficeScreen.container}>
                    {this.renderErrorText(errorFetching)}
                </View >
            )

        if (offices.length == 0)
            return (
                <View style={stylesOfficeScreen.container}>
                    {this.renderEmptyText()}
                </View>
            )

        return (
            <View style={stylesOfficeScreen.container}>
                {this.renderOffices(offices)}
            </View>
        )
    }
}

class RentsScreen extends Component {
    render() {
        return (
            <View>
                <Text>Rents screen</Text>
            </View>
        )
    }
}

class HomeScreen extends Component {
    onPressSearch = () => Actions.office()

    renderHeader = () => {
        return (
            <Header hasTabs noLeft>
                <Body style={styles.header}>
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
                <ConnectedOfficesScreen />
            </Tab>
            <Tab heading='Rents'>
                <RentsScreen />
            </Tab>
        </Tabs>

    )

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderTabs()}
            </View>
        )
    }
}

const mapStateToPropsOfficesScreen = state => ({
    loading: state.UserReducer.loading,
    errorFetching: state.UserReducer.errorFetching,
    offices: state.UserReducer.offices
})

const stylesOfficeScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingLeft: 32
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        margin: 16,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabs: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const ConnectedOfficesScreen = connect(
    mapStateToPropsOfficesScreen,
    { fetchOffices }
)(OfficesScreen)

export default HomeScreen