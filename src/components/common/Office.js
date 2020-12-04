import React from 'react'

import { TouchableOpacity } from 'react-native'

import {
    Card,
    CardItem,
    Text,
} from 'native-base'


function getScore(office) {
    const score = office.scoring / office.nScore
    return score.toFixed(1)
}

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

const Office = props => {
    const { office } = props
    const score = getScore(office)
    const score_color = getScoreColor(score)

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Card>
                <CardItem header>
                    <Text>{office.description}</Text>
                </CardItem>
                <CardItem style={{ marginVertical: -15 }}>
                    <Text>
                        Address: {office.address} - {office.number} - {office.district}{'\n'}
                    City: {office.city}{'\n'}
                    Capacity: {office.capacity}{'\n'}
                    Daily rate: R$ {office.daily_rate}{'\n'}
                    </Text>
                </CardItem>
                <CardItem footer bordered>
                    <Text>Scoring: </Text>
                    <Text style={{ color: score_color, fontWeight: 'bold' }}>{score}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}
export default Office