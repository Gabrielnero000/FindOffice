import React, { Component } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import {
    Header,
    Text,
    Tab,
    Tabs,
    Body,
    Title,
} from 'native-base'

import { FloatingAction } from "react-native-floating-action"

import Office from '../common/Office'
import Loading from '../common/Loading'

import { fetchTenantOffices } from '../../redux/actions/TenantActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'

class OfficesScreen extends Component {
    state = {
        loading: false,
        errorFetching: '',
        offices: []
    }

    componentDidMount() {
        const { user } = this.props
        this.props.fetchTenantOffices(user.userId)
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

    onPressAdd = () => Actions.tenantOffice()

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
            <Text>There is no offices right now, try add one.</Text>
        </View>
    )

    renderErrorText = errorFetching => (
        <View style={stylesOfficeScreen.errorText}>
            <Text>{errorFetching}</Text>
        </View>
    )

    renderAddButton = () => (
        <FloatingAction
            onPressMain={this.onPressAdd}
            showBackground={false}
        />
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
                    {this.renderAddButton()}
                </View >
            )

        if (offices.length == 0)
            return (
                <View style={stylesOfficeScreen.container}>
                    {this.renderEmptyText()}
                    {this.renderAddButton()}
                </View>
            )

        return (
            <View style={stylesOfficeScreen.container}>
                {this.renderOffices(offices)}
                {this.renderAddButton()}
            </View>
        )
    }
}

class StatsScreen extends Component {
    render() {
        return (
            <View>
                <Text>Stats Screen</Text>
            </View>
        )
    }
}


class TenantScreen extends Component {

    renderHeader = () => {
        return (
            <Header hasTabs noLeft>
                <Body style={styles.header}>
                    <Title>Find Office</Title>
                </Body>
            </Header>
        )
    }

    renderTabs = () => (
        <Tabs initialPage={0}>
            <Tab heading="My Offices">
                <ConnectedOfficesScreen />
            </Tab>
            <Tab heading="Stats">
                <StatsScreen />
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
    user: state.AuthReducer.user,
    loading: state.TenantReducer.loading,
    errorFetching: state.TenantReducer.errorFetching,
    offices: state.TenantReducer.offices
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
    { fetchTenantOffices }
)(OfficesScreen)

export default TenantScreen