import React, { Component } from 'react'
import {
    StyleSheet,
    SectionList,
} from 'react-native'

import Office from '../../common/Office'
import Rent from '../../common/Rent'
import Loading from '../../common/Loading'

import {
    Container,
    Content,
    Text,
    Label
} from 'native-base'

import {
    getAverageMonths,
    getMonthRents,
    getTopRentsOffice,
    getTopScoreOffice,
    getTopValueOffice,
    getTotalMonth,
} from '../../../redux/actions/LandmasterActions'
import { connect } from 'react-redux'

class StatsScreen extends Component {
    state = {
        loading: false,
        errorStats: false,
        stats: {
            total_on_month: [],
            avg_on_months: [],
            best_scoring_office: [],
            most_rented_office: [],
            best_value_office: [],
            month_rents: []
        }
    }

    componentDidMount() {
        const { user } = this.props
        this.props.getAverageMonths(user.landmasterId)
        this.props.getMonthRents(user.landmasterId)
        this.props.getTopRentsOffice(user.landmasterId)
        this.props.getTopScoreOffice(user.landmasterId)
        this.props.getTopValueOffice(user.landmasterId)
        this.props.getTotalMonth(user.landmasterId)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorStats: this.props.errorStats,
                stats: {
                    total_on_month: this.props.totalOnMonth,
                    avg_on_months: this.props.avgOnMonths,
                    best_scoring_office: this.props.topScoreOffice,
                    most_rented_office: this.props.topRentsOffice,
                    best_value_office: this.props.topValueOffice,
                    month_rents: this.props.monthRents
                }
            })
        }
    }

    haveStats = () => {
        const {
            total_on_month,
            avg_on_months,
            best_scoring_office,
            most_rented_office,
            best_value_office,
            month_rents
        } = this.state.stats

        return (total_on_month.length + avg_on_months.length + best_scoring_office.length + most_rented_office.length + best_value_office.length + month_rents.length) > 0
    }

    renderValue = total => (
        <Text style={{ alignSelf: 'center', fontSize: 64, color: 'blue', fontWeight: 'bold' }}>R$ {!isNaN(total) ? total.toFixed(2) : '-'}</Text>
    )

    renderOffice = office => (
        <Office office={office} />
    )

    renderRent = rent => (
        <Rent rent={rent} />
    )

    renderSectionHeader = ({ section: { title } }) => (
        <Label style={{ margin: 8 }}>{title}</Label>
    )

    renderItems = ({ item, section: { title: type } }) => {
        switch (type) {
            case 'Total on month':
                return this.renderValue(item)
            case 'Average on months':
                return this.renderValue(item)
            case 'Best scoring office':
                return this.renderOffice(item)
            case 'Most rented office':
                return this.renderOffice(item)
            case 'Best value office':
                return this.renderOffice(item)
            case 'Month rents':
                return this.renderRent(item)
        }
    }

    renderRents = () => (
        <SectionList
            keyExtractor={(item, index) => 'key' + index}
            sections={[
                { title: 'Total on month', data: this.state.stats.total_on_month },
                { title: 'Average on months', data: this.state.stats.avg_on_months },
                { title: 'Best scoring office', data: this.state.stats.best_scoring_office },
                { title: 'Most rented office', data: this.state.stats.most_rented_office },
                { title: 'Best value office', data: this.state.stats.best_value_office },
                { title: 'Month rents', data: this.state.stats.month_rents },
            ]}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItems}
        />
    )

    renderEmptyText = () => (
        <Text>You don't stats yet.</Text>
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

        if (!this.haveStats())
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
    user: state.AuthReducer.user,
    loading: state.LandmasterReducer.loading,
    errorStats: state.LandmasterReducer.errorFetching,
    totalOnMonth: state.LandmasterReducer.totalOnMonth,
    avgOnMonths: state.LandmasterReducer.avgOnMonths,
    topScoreOffice: state.LandmasterReducer.topScoreOffice,
    topRentsOffice: state.LandmasterReducer.topRentsOffice,
    topValueOffice: state.LandmasterReducer.topValueOffice,
    monthRents: state.LandmasterReducer.monthRents,
})


const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default connect(
    mapStateToProps,
    {
        getAverageMonths,
        getMonthRents,
        getTopRentsOffice,
        getTopScoreOffice,
        getTopValueOffice,
        getTotalMonth,
    }
)(StatsScreen)