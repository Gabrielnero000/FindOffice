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

import { 
    fetchRents, 
    checkIn, 
    checkOut, 
    scoreRent 
} from '../../../redux/actions/TenantActions'

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class RentsScreen extends Component {
    state = {
        loading: false,
        errorFetching: '',
        errorCheckin: '',
        errorCheckout: '',
        errorScoring: '',
        rents: {
            no_checkIn: [],
            no_checkOut: [],
            no_scoring: [],
            past_rents: []
        }
    }

    componentDidMount() {
        this.props.fetchRents(this.props.tenand_id)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorFetching: this.props.errorFetching,
                errorCheckin: this.props.errorCheckin,
                errorCheckout: this.props.errorCheckout,
                errorScoring: this.props.errorScoring,
                rents: this.props.rents,
            })
        }
    }

    getRentsNumber = () => {
        const {no_checkIn, no_checkOut, no_scoring, past_rents} = this.state.rents
        return no_checkIn.length + no_checkOut.length + no_scoring.length + past_rents.length
    }

    onPressRent = (rent, type) => {
        switch(type) {
            case 'Waiting Check-in':
                this.props.checkIn(rent.rentId)
                break
            case 'Waiting Check-out':
                this.props.checkOut(rent.rentId)
                break
            case 'Waiting Scoring':
                Actions.scoring({ rent })
                break
            case 'Others':
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
    tenand_id: state.AuthReducer.user.tenantId,
    loading: state.TenantReducer.loading,
    errorFetching: state.TenantReducer.errorFetching,
    errorCheckin: state.TenantReducer.errorCheckin,
    errorCheckout: state.TenantReducer.errorCheckout,
    errorScoring: state.TenantReducer.errorScoring,
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
    { 
        fetchRents,
        checkIn,
        checkOut,
        scoreRent
    }
)(RentsScreen)