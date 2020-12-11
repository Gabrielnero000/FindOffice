import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
} from 'react-native'

import {
    Container,
    Content,
    Text,
} from 'native-base'

import Office from '../../common/Office'
import Loading from '../../common/Loading'

import { fetchOffices } from '../../../redux/actions/TenantActions'
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

    onPressOffice = office => Actions.booking({ office })

    renderOffice = ({ item: office }) => (
        <Office
            onPress={() => this.onPressOffice(office)}
            office={office}
        />
    )

    renderOffices = () => (
        <FlatList
            keyExtractor={office => office.officeId.toString()}
            data={this.state.offices}
            renderItem={this.renderOffice}
        />
    )

    renderEmptyText = () => (
        <Text>There is no offices right now, try again later</Text>
    )

    renderErrorText = () => (
        <Text style={styles.errorText}>{this.state.errorFetching}</Text>
    )

    render() {
        if (this.state.loading)
            return (
                <Container>
                    <Content contentContainerStyle={styles.content}>
                        <Loading />
                    </Content>
                </Container>
            )

        if (this.state.errorFetching)
            return (
                <Container>
                    <Content contentContainerStyle={styles.content}>
                        {this.renderErrorText()}
                    </Content>
                </Container>
            )

        if (this.state.offices.length == 0)
            return (
                <Container>
                    <Content contentContainerStyle={styles.content}>
                        {this.renderEmptyText()}
                    </Content>
                </Container>
            )

        return (
            <Container>
                {this.renderOffices()}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.TenantReducer.loading,
    errorFetching: state.TenantReducer.errorFetching,
    offices: state.TenantReducer.offices
})

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red'
    }
})

export default connect(
    mapStateToProps,
    { fetchOffices }
)(OfficesScreen)