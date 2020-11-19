import React from 'react'
import {
    View,
    TouchableOpacity,
} from 'react-native'

import {
    Card,
    Text,
} from 'react-native-elements'

const Office = props => {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <Card>
                    <Card.Title>{props.office.description}</Card.Title>
                    <Text>{props.office.address}, {props.office.number} - {props.office.district} - {props.office.city}</Text>
                    <Text>Capacity: {props.office.capacity}</Text>
                    <Text>Score: {props.office.scoring / props.office.nScores}</Text>
                </Card>
            </TouchableOpacity>
        </View>
    )
}

export default Office