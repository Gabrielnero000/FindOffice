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


const offices = [
    {
        officeId: 0,
        landmasterId: 0,
        city: 'João Pessoa',
        district: 'Centro',
        address: 'Rua dos Escoteiros',
        number: 'S/N',
        description: 'Centro de Informática',
        daily_rate: 500.0,
        capacity: 50,
        scoring: 50,
        nScore: 10,
        type: 'business'
    },
    {
        officeId: 1,
        landmasterId: 0,
        city: 'João Pessoa',
        district: 'Cidade Universitaria',
        address: 'Campus I',
        number: '64',
        description: 'Universidade Federal da Paraíba',
        daily_rate: 400.0,
        capacity: 100,
        scoring: 40,
        nScore: 10,
        type: 'business'
    },
    {
        officeId: 2,
        landmasterId: 0,
        city: 'Mari',
        district: 'Centro',
        address: 'Rua Napoleão Laureano',
        number: '226',
        description: 'Minha casa',
        daily_rate: 300.0,
        capacity: 5,
        scoring: 30,
        nScore: 10,
        type: 'residential'
    },
    {
        officeId: 3,
        landmasterId: 0,
        city: 'João Pessoa',
        district: 'Mangabeira',
        address: 'Avenida Hílton Souto Maior',
        number: 'S/N',
        description: 'Shopping Mangabeira',
        daily_rate: 3000.0,
        capacity: 500,
        scoring: 2.5,
        nScore: 10,
        type: 'business'
    },
    {
        officeId: 4,
        landmasterId: 0,
        city: 'João Pessoa',
        district: 'Cabo Branco',
        address: 'Rodovia PB-008 Km 5',
        number: 'S/N',
        description: 'Centro de Convenções de João Pessoa',
        daily_rate: 5000.0,
        capacity: 800,
        scoring: 5,
        nScore: 10,
        type: 'business'
    },
]


class OfficesScreen extends Component {
    state = {
        loading: false,
        errorFetching: '',
        offices
    }

    // componentDidMount() {
    //     this.props.fetchOffices()
    // }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorFetching: this.props.errorFetching,
                // offices: this.props.offices,
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