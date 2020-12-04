import React from 'react'

import { TouchableOpacity } from 'react-native'

import {
    Card,
    CardItem,
    Text,
} from 'native-base'


function getScoreColor(score) {
    if (score < 1)
        return 'red'
    if (score < 2)
        return 'orange'
    if (score < 3)
        return 'yellow'
    if (score < 4)
        return 'greenyellow'
    return 'green'
}

const Rent = props => {
    const { rent } = props
    const score_color = getScoreColor(rent.scoring)

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Card>
                <CardItem>
                    <Text>
                        Booking: from {rent.bookingStart} to {rent.bookingEnd}{'\n'}
                        Check-in: {rent.checkIn !== null ? rent.checkIn : '-'}{'\n'}
                        Check-out: {rent.checkOut !== null ? rent.checkOut : '-'}
                    </Text>
                </CardItem>
                <CardItem footer bordered>
                    <Text>Scoring: </Text>
                    <Text style={{ color: score_color, fontWeight: 'bold' }}>{rent.scoring !== null ? rent.scoring : '-'}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}

export default Rent