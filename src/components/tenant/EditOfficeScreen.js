import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native'

import {
    Container,
    Content,
    Button,
    Header,
    Picker,
    Body,
    Title,
    Form,
    Item,
    Input,
    Label,
    Text
} from 'native-base'

import Loading from '../common/Loading'

import { addOffice } from '../../redux/actions/TenantActions'
import { connect } from 'react-redux'

class EditOfficeScreen extends Component {

    state = {
        loading: false,
        errorAdding: '',
        address: '',
        district: '',
        number: '',
        type: undefined,
        daily_rate: null,
        description: '',
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorAdding: this.props.errorAdding,
            })
        }
    }

    onAddressChange = address => this.setState({ address })
    onDistrictChange = district => this.setState({ district })
    onNumberChange = number => this.setState({ number })
    onTypeChange = type => this.setState({ type })
    onDailyRateChange = daily_rate => this.setState({ daily_rate })
    onDescriptionChange = description => this.setState({ description })

    onPressAdd = () => {
        const { address, district, number, type, daily_rate, description } = this.state
        const { user } = this.props

        const office = {
            id_owner: user.userId,
            address,
            district,
            number,
            extra: description,
            type,
            daily_rate,
        }

        this.props.addOffice(office)
    }

    renderHeader = () => (
        <Header>
            <Body style={styles.header}>
                <Title>Add Office</Title>
            </Body>
        </Header>
    )

    renderForm = () => (
        <Form>
            <Item>
                <Input placeholder={'Address'} onChange={this.onAddressChange} />
            </Item>
            <Item>
                <Input placeholder={'District'} onChange={this.onDistrictChange} />
                <View
                    style={{
                        height: 50,
                        width: 1,
                        backgroundColor: 'lightgray'
                    }}
                />
                <Input placeholder={'Number'} keyboardType='numeric' onChange={this.onNumberChange} />
            </Item>
            <Item picker style={{ paddingHorizontal: 20 }}>
                <Label>Office type:</Label>
                <Picker
                    mode='dropdown'
                    placeholder='Select the office type'
                    selectedValue={this.state.type}
                    onValueChange={this.onTypeChange}
                >
                    <Picker.Item label='Residential' value='residential' />
                    <Picker.Item label='Business' value='business' />
                </Picker>
            </Item>
            <Item>
                <Input placeholder='Daily Rate' keyboardType='numeric' onChange={this.onDailyRateChange} />
            </Item>
            <Item regular last>
                <Input placeholder='Description' onChange={this.onDescriptionChange} />
            </Item>
        </Form>
    )

    renderButtons = () => (
        <View style={{ alignSelf: 'center', marginTop: 64 }}>
            <Button onPress={this.onPressAdd}>
                <Text>Add</Text>
            </Button>
        </View>
    )

    renderErrorText = errorText => (
        <View style={styles.errorText}>
            <Text style={{color: 'red'}}>{errorText}</Text>
        </View>

    )

    render() {
        const { loading, errorAdding } = this.state

        if (loading)
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )

        return (
            <Container>
                {this.renderHeader()}
                <Content>
                    {this.renderForm()}
                    {this.renderButtons()}
                    {this.renderErrorText(errorAdding)}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.AuthReducer.user,
    loading: state.TenantReducer.loading,
    errorAdding: state.TenantReducer.errorAdding,
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        margin: 16,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 64
    }
});

export default connect(
    mapStateToProps,
    { addOffice }
)(EditOfficeScreen)