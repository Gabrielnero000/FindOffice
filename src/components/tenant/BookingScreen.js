import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native'

import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Label,
    Button,
    Text
} from 'native-base'

import { Calendar } from 'react-native-calendars'
import { Root, Popup } from 'popup-ui'

class BookingScreen extends Component {
    state = {
        unaviable_days: {
            '2020-12-09': { startingDay: true, color: 'gray', textColor: 'white' },
            '2020-12-10': { selected: true, color: 'gray' },
            '2020-12-11': { endingDay: true, selected: true, color: 'gray' },
        },
        booking_start: null,
        booking_end: null,
        invalid_day_choosed: false,
        booking_days: {}
    }

    renderErrorDialog = () => Popup.show({
        type: 'Warning',
        title: 'Failed to choose day',
        textBody: 'You choosed a day that is unaviable. Please choose another one.',
        buttonText: 'Ok',
        callback: () => {
            Popup.hide()
            this.setState({ invalid_day_choosed: false })
        }
    })

    validateDay = day => {
        if (day in this.state.unaviable_days) {
            this.setState({
                booking_start: null,
                booking_end: null,
                invalid_day_choosed: true,
                booking_days: {}
            })

            this.renderErrorDialog()

            return false
        }

        return true
    }

    setBookingStart = day => {
        const { booking_days } = this.state

        booking_days[day] = { startingDay: true, color: 'blue', textColor: 'white' }
        this.setState({
            booking_start: day,
            booking_days
        })
    }

    setBookingRange = (start, end) => {
        const { booking_days } = this.state

        let date = new Date(start)

        while (date < end) {
            date.setDate(date.getDate() + 1)
            let str_date = date.toISOString().substring(0, 10)
            if (!this.validateDay(str_date))
                return false

            booking_days[str_date] = { selected: true, color: 'blue' }
        }

        return true
    }

    setBookingEnd = day => {
        const { booking_start, booking_days } = this.state

        let start = new Date(booking_start)
        let end = new Date(day)

        if (start > end) {
            start = new Date(day)
            end = new Date(booking_start)
            booking_days[booking_start] = { endingDay: true, selected: true, color: 'blue' }
            booking_days[day] = { startingDay: true, color: 'blue', textColor: 'white' }
        }
        else {
            booking_days[day] = { endingDay: true, selected: true, color: 'blue' }
        }

        if (this.setBookingRange(start, end))
            this.setState({
                booking_start: start.toISOString().substring(0, 10),
                booking_end: end.toISOString().substring(0, 10),
                booking_days
            })
    }

    restartBooking = day => {
        this.setState({
            booking_start: day,
            booking_end: null,
            booking_days: {
                [day]: {
                    startingDay: true,
                    color: 'blue',
                    textColor: 'white'
                }
            }
        })
    }

    closePopUp = () => this.setState({ invalid_day_choosed: false })

    onDayPress = day => {
        const { booking_start, booking_end } = this.state
        day = day['dateString']

        if (this.validateDay(day)) {
            if (booking_start == null)
                this.setBookingStart(day)
            else if (booking_end == null)
                this.setBookingEnd(day)
            else
                this.restartBooking(day)
        }
    }

    renderHeader = () => (
        <Header noLeft>
            <Body>
                <Title>{this.props.office.description}</Title>
            </Body>
        </Header>
    )


    renderCalendarLabel = () => (
        <Label style={{ margin: 16 }}>Choose your booking days:</Label>
    )

    renderCalendar = () => (
        <Calendar
            onDayPress={this.onDayPress}
            markedDates={{ ...this.state.unaviable_days, ...this.state.booking_days }}
            markingType={'period'}
        />
    )

    renderPrice = () => {
        const { booking_days } = this.state
        const n_days = Object.keys(booking_days).length
        const price = this.props.office.daily_rate * n_days

        return <Label style={{ margin: 16, textAlign: 'center' }}>{n_days} days: R$ {price}</Label>
    }

    renderRentButton = () => (
        <Button style={{ alignSelf: 'center', width: 100, justifyContent: 'center', marginTop: 32 }}>
            <Title>Rent</Title>
        </Button>
    )

    render() {
        return (
            <Root>
                <Container>
                    {this.renderHeader()}
                    <Content contentContainerStyle={styles.content}>
                        {this.renderCalendarLabel()}
                        {this.renderCalendar()}
                        {this.renderPrice()}
                        {this.renderRentButton()}
                    </Content>
                </Container>
            </Root>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default BookingScreen