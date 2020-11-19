import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { Header } from 'react-native-elements'

import Office from '../common/Office'

import { fetchOffices } from '../../redux/actions/UserActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'


class HomeScreen extends Component {
    state = {
        loading: false,
        errorFetching: '',
        offices: []
    }

    componentDidMount() {
        this.props.fetchOffices()
    }

    onPressSearch = () => Actions.office()
    onPressOffice = office => console.log(office)

    renderLoading = loading => (
        <View>
            <ActivityIndicator />
        </View>
    )

    renderHeader = () => {
        return (
            <Header
                centerComponent={{ text: 'Find Office', style: styles.header }}
                rightComponent={{ icon: 'search', color: '#fff', onPress: this.onPressSearch }}
            />
        )
    }

    renderOffice = ({ item: office }) => {
        return (
            <Office
                onPress={() => this.onPressOffice(office)}
                office={office}
            />
        )
    }

    renderOffices = offices => {
        return (
            <FlatList
                keyExtractor={office => office.officeId.toString()}
                data={offices}
                renderItem={this.renderOffice}
            />
        )
    }

    renderErrorText = errorFetching => (
        <View>
            <Text>{errorFetching}</Text>
        </View>
    )

    render() {
        const { loading, errorFetching, offices } = this.state

        return (
            <View>
                {this.renderLoading(loading)}
                {this.renderHeader()}
                {this.renderOffices(offices)}
                {this.renderErrorText(errorFetching)}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.UserReducer.loading,
    errorFetching: state.UserReducer.errorFetching,
    offices: state.UserReducer.offices
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});

export default connect(
    mapStateToProps,
    { fetchOffices }
)(HomeScreen)