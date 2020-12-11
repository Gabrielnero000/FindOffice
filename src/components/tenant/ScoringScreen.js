import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native'

import {
    AirbnbRating
} from 'react-native-elements'

import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Button,
} from 'native-base'

import Loading from '../common/Loading'

import { scoreRent } from '../../redux/actions/TenantActions'
import { connect } from 'react-redux'

class ScoringScreen extends Component {
    state = {
        loading: false,
        scoring: 3
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
            })
        }
    }

    onPressSend = () => {
        const { rent: { rentId: rent_id } } = this.props
        const { scoring } = this.state

        this.props.scoreRent(rent_id, scoring)
    }


    renderHeader = () => (
        <Header hasTabs noLeft>
            <Body>
                <Title>Score</Title>
            </Body>
        </Header>
    )

    renderScoring = () => (
        <AirbnbRating
            defaultRating={this.state.scoring}
            onFinishRating={scoring => this.setState({ scoring })}
        />
    )

    renderSendButton = () => (
        <Button style={styles.button} onPress={this.onPressSend}>
            <Title>Send</Title>
        </Button>
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

        return (
            <Container>
                {this.renderHeader()}
                <Content contentContainerStyle={styles.content}>
                    {this.renderScoring()}
                    {this.renderSendButton()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.TenantReducer.loading
})

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 80,
        marginTop: 16,
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

export default connect(
    mapStateToProps,
    { scoreRent }
)(ScoringScreen)