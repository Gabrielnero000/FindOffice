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

import Loading from '../common/Loading'

import { Calendar } from 'react-native-calendars'
import { Popup } from 'popup-ui'

import {
    getOfficeOccupation,
    rent
} from '../../redux/actions/TenantActions'
import { connect } from 'react-redux'

class BookingScreen extends Component {
    state = {
        loading: false,
        errorGettingOccupation: '',
        errorRenting: '',
        unaviable_days: {},
        currentMonth: new Date().getMonth() + 1,
        booking_start: null,
        booking_end: null,
        invalid_day_choosed: false,
        booking_days: {}
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let unaviable_days = {}

            this.props.unaviable_days.forEach(day => unaviable_days[day.substring(0, 10)] = { selected: true, color: 'gray' })

            this.setState({
                loading: this.props.loading,
                errorGettingOccupation: this.props.errorGettingOccupation,
                errorRenting: this.props.errorRenting,
                unaviable_days,
            })
        }
    }

    componentDidMount() {
        this.updateOccupiedDays(new Date().getMonth() + 1)
    }


    updateOccupiedDays(month) {
        console.log(month)
        const { office: { officeId: office_id } } = this.props
        this.props.getOfficeOccupation(office_id, month)
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
        }

        if (this.setBookingRange(start, end))
            start = start.toISOString().substring(0, 10)
        end = end.toISOString().substring(0, 10)

        booking_days[start] = { startingDay: true, color: 'blue', textColor: 'white' }
        booking_days[end] = { endingDay: true, textColor: 'white', color: 'blue' }

        this.setState({
            booking_start: start,
            booking_end: end,
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

    onPressRent = () => {
        const { tenant_id } = this.props
        const { office: { officeId: office_id } } = this.props
        const { booking_days } = this.state

        const rent_days = Object.keys(booking_days).sort((d1, d2) => d1 - d2)

        this.props.rent(office_id, tenant_id, rent_days)

    }

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
            markingType={'period'}
            markedDates={{ ...this.state.unaviable_days, ...this.state.booking_days }}
            minDate={new Date().toISOString().substring(0, 10)}
        />
    )

    renderPrice = () => {
        const { booking_days } = this.state
        const n_days = Object.keys(booking_days).length
        const price = this.props.office.daily_rate * n_days

        return <Label style={{ margin: 16, textAlign: 'center' }}>{n_days} days: R$ {price}</Label>
    }

    renderRentButton = () => (
        <Button style={{ alignSelf: 'center', width: 100, justifyContent: 'center', marginTop: 32 }} onPress={this.onPressRent}>
            <Title>Rent</Title>
        </Button>
    )

    renderErrorText = text => (
        <Text style={styles.errorText}>{text}</Text>
    )

    render() {
        if (this.state.loading)
            return (
                <Container>
                    <Content contentContainerStyle={styles.emptyContent}>
                        <Loading />
                    </Content>
                </Container>
            )

        if (this.state.errorGettingOccupation)
            return (
                <Container>
                    <Content contentContainerStyle={styles.emptyContent}>
                        {this.renderErrorText(this.state.errorGettingOccupation)}
                    </Content>
                </Container>
            )

        return (
            <Container>
                {this.renderHeader()}
                <Content contentContainerStyle={styles.content}>
                    {this.renderCalendarLabel()}
                    {this.renderCalendar()}
                    {this.renderPrice()}
                    {this.renderRentButton()}
                    {this.renderErrorText(this.state.errorRenting)}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.TenantReducer.loading,
    errorGettingOccupation: state.TenantReducer.errorGettingOccupation,
    errorRenting: state.TenantReducer.errorRenting,
    unaviable_days: state.TenantReducer.unaviable_days,
    tenant_id: state.AuthReducer.user.tenantId
})

const styles = StyleSheet.create({
    emptyContent: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    errorText: {
        alignSelf: 'center',
        marginTop: 8,
        color: 'red',
        textAlign: 'center'
    }
})

export default connect(
    mapStateToProps,
    {
        getOfficeOccupation,
        rent
    }
)(BookingScreen)