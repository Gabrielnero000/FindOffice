import React, { Component } from 'react'
import {
    StyleSheet,
    SectionList,
} from 'react-native'

import Office from '../../common/Office'
import Rent from '../../common/Rent'
import Loading from '../../common/Loading'

const total_on_month = [350.5]
const avg_on_months = [280.85]

const best_scoring_office = [
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
    }
]

const most_rented_office = [
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
    }
]

const best_value_office = [
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

    }
]

const month_rents = [
    {
        rentId: 0,
        officeId: 2,
        tenantId: 0,
        bookingStart: '2020-12-03',
        bookingEnd: '2020-12-10',
        checkIn: null,
        checkOut: null,
        scoring: null
    },
    {
        rentId: 1,
        officeId: 2,
        tenantId: 0,
        bookingStart: '2020-12-14',
        bookingEnd: '2020-12-21',
        checkIn: '2020-12-14',
        checkOut: null,
        scoring: null
    },
    {
        rentId: 2,
        officeId: 2,
        tenantId: 0,
        bookingStart: '2020-12-12',
        bookingEnd: '2020-12-14',
        checkIn: '2020-12-12',
        checkOut: '2020-12-14',
        scoring: null
    }
]

import {
    Container,
    Content,
    Text,
    Label
} from 'native-base'

class StatsScreen extends Component {
    state = {
        stats: {
            total_on_month,
            avg_on_months,
            best_scoring_office,
            most_rented_office,
            best_value_office,
            month_rents
        }
    }

    renderValue = total => (
        <Text style={{alignSelf: 'center', fontSize: 64, color: 'blue', fontWeight: 'bold'}}>R$ {total.toFixed(2)}</Text>
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
                keyExtractor={(item, index) => 'key'+index}
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

        render() {
            return (
                <Container>
                    {this.renderRents()}
                </Container>
            )
        }
    }

    const styles = StyleSheet.create({
        content: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }
    })

    export default StatsScreen