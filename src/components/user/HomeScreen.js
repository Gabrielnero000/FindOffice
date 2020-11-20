import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native'

import {
    Header,
    Text
} from 'react-native-elements'

import Office from '../common/Office'
import Loading from '../common/Loading'

import { fetchOffices } from '../../redux/actions/UserActions'
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'


class HomeScreen extends Component {
    state = {
        loading: false,
        errorFetching: '',
        offices: []
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

    componentDidMount() {
        this.props.fetchOffices()
    }

    onPressSearch = () => Actions.office()
    onPressOffice = office => console.log(office)

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
                contentContainerStyle={styles.list}
                keyExtractor={office => office.officeId.toString()}
                data={offices}
                renderItem={this.renderOffice}
            />
        )
    }

    renderEmptyText = () => {
        <View style={styles.emptyText}>
            <Text>There is no offices right now, try again later</Text>
        </View>
    }

    renderErrorText = errorFetching => (
        <View style={styles.errorText}>
            <Text>{errorFetching}</Text>
        </View>
    )

    render() {
        const { loading, errorFetching, offices } = this.state

        if (loading)
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )

        if (errorFetching)
            return (
                <View style={styles.container}>
                    {this.renderHeader()}
                    {this.renderErrorText(errorFetching)}
                </View >
            )

        if (offices.length == 0)
            return (
                <View style={styles.container}>
                    {this.renderHeader()}
                    {this.renderEmptyText()}
                </View>
            )

        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderOffices(offices)}
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
        margin: 16,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
});

export default connect(
    mapStateToProps,
    { fetchOffices }
)(HomeScreen)