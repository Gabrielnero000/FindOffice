import React, { Component } from 'react'
import {
    StyleSheet,
    SectionList,
} from 'react-native'

import {
    Container,
    Content,
    Text,
    Label
} from 'native-base'

import Rent from '../../common/Rent'
import Loading from '../../common/Loading'

import { fetchRents } from '../../../redux/actions/TenantActions'
import { connect } from 'react-redux'


const no_checkIn = [
    {
        rentId: 0,
        officeId: 2,
        tenantId: 0,
        bookingStart: '2020-12-03',
        bookingEnd: '2020-12-10',
        checkIn: null,
        checkOut: null,
        scoring: null
    }
]

const no_checkOut = [
    {
        rentId: 0,
        officeId: 2,
        tenantId: 0,
        bookingStart: '2020-12-14',
        bookingEnd: '2020-12-21',
        checkIn: '2020-12-14',
        checkOut: null,
        scoring: null
    }
]

const no_scoring = [
    {
        rentId: 0,
        officeId: 2,
        tenantId: 0,
        bookingStart: '2020-12-12',
        bookingEnd: '2020-12-14',
        checkIn: '2020-12-12',
        checkOut: '2020-12-14',
        scoring: null
    }
]

const past_rents = [
    {
        rentId: 0,
        officeId: 2,
        tenantId: 0,
        bookingStart: '2020-12-16',
        bookingEnd: '2020-12-18',
        checkIn: '2020-12-16',
        checkOut: '2020-12-17',
        scoring: 3.8
    }
]

class RentsScreen extends Component {
    state = {
        loading: false,
        errorFetching: '',
        rents: {
            no_checkIn,
            no_checkOut,
            no_scoring,
            past_rents
        }
    }

    // componentDidMount() {
    //     this.props.fetchRents()
    // }

    getRentsNumber = () => {
        const {no_checkIn, no_checkOut, no_scoring, past_rents} = this.state.rents
        return no_checkIn.length + no_checkOut.length + no_scoring.length + past_rents.length
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorFetching: this.props.errorFetching,
                // rents: this.props.rents,
            })
        }
    }

    onPressRent = (rent, type) => {
        switch(type) {
            case 'Waiting Check-in':
                console.log(rent, 'check in')
                break
            case 'Waiting Check-out':
                console.log(rent, 'check out')
                break
            case 'Waiting Scoring':
                console.log(rent, 'scoring')
                break
            case 'Others':
                console.log(rent, 'Others')
                break
        }
    }

    renderRent = ({item: rent, section: {title: type}}) => (
        <Rent
            onPress={() => this.onPressRent(rent, type)}
            rent={rent}
        />
    )

    renderSectionHeader = ({section: {title}}) => (
        <Label style={{margin: 8}}>{title}</Label>
    )

    renderRents = () => (
        <SectionList
            keyExtractor={rent => rent.rentId.toString()}
            sections={[
                { title:'Waiting Check-in', data: this.state.rents.no_checkIn },
                { title:'Waiting Check-out', data: this.state.rents.no_checkOut },
                { title:'Waiting Scoring', data: this.state.rents.no_scoring },
                { title:'Others', data: this.state.rents.past_rents },
            ]}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderRent}
        />
    )

    renderEmptyText = () => (
        <Text>You don't have any rent.</Text>
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

        if (this.getRentsNumber() == 0)
            return (
                <Container>
                    <Content contentContainerStyle={styles.content}>
                        {this.renderEmptyText()}
                    </Content>
                </Container>
            )

        return (
            <Container>
                {this.renderRents()}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.TenantReducer.loading,
    errorFetching: state.TenantReducer.errorFetching,
    rents: state.TenantReducer.rents
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
    { fetchRents }
)(RentsScreen)