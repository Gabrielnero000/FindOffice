import React, { Component } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import {
    Container,
    Content,
    Text,
} from 'native-base'

import { FloatingAction } from "react-native-floating-action"

import Office from '../../common/Office'
import Loading from '../../common/Loading'

import { fetchLandmasterOffices } from '../../../redux/actions/LandmasterActions'
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
        this.props.fetchLandmasterOffices(user.landmasterId)
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

    onPressAdd = () => Actions.landmasterOffice()

    onPressOffice = office => console.log(office)

    renderOffice = ({ item: office }) => (
        <Office
            onPress={() => this.onPressOffice(office)}
            office={office}
        />
    )

    renderOffices = () => (
        <FlatList
            contentContainerStyle={stylesOfficeScreen.list}
            keyExtractor={office => office.officeId.toString()}
            data={this.state.offices}
            renderItem={this.renderOffice}
        />
    )

    renderEmptyText = () => (
        <Text>There is no offices right now, try add one.</Text>

    )

    renderErrorText = () => (
        <Text style={styles.errorText}>{this.state.errorFetching}</Text>
    )

    renderAddButton = () => (
        <FloatingAction
            onPressMain={this.onPressAdd}
            showBackground={false}
        />
    )

    render() {
        if (this.state.loading)
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <Loading />
                </Content>
            </Container>

        if (this.state.errorFetching)
            return (
                <Container>
                    <Content contentContainerStyle={styles.content}>
                        {this.renderErrorText()}
                        {this.renderAddButton()}
                    </Content>
                </Container>
            )

        if (this.state.offices.length == 0)
            return (
                <Container>
                    <Content contentContainerStyle={styles.content}>
                        {this.renderEmptyText()}
                        {this.renderAddButton()}
                    </Content>
                </Container>
            )

        return (
            <Container>
                <Content contentContainerStyle={styles.content}>
                    {this.renderOffices()}
                    {this.renderAddButton()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.AuthReducer.user,
    loading: state.LandmasterReducer.loading,
    errorFetching: state.LandmasterReducer.errorFetching,
    offices: state.LandmasterReducer.offices
})

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
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
    { fetchLandmasterOffices }
)(OfficesScreen)