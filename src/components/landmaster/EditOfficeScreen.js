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

import { addOffice } from '../../redux/actions/LandmasterActions'
import { connect } from 'react-redux'

class EditOfficeScreen extends Component {

    state = {
        loading: false,
        errorAdding: '',
        address: '',
        district: '',
        number: '',
        city: '',
        type: 'residential',
        daily_rate: null,
        capacity: null,
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
    onCityChange = city => this.setState({ city })
    onCapacityChange = capacity => this.setState({ capacity })
    onDescriptionChange = description => this.setState({ description })

    onPressAdd = () => {
        const office = {
            landmasterId: this.props.user.landmasterId,
            city: this.state.city,
            district: this.state.district,
            address: this.state.address,
            number: this.state.number,
            description: this.state.description,
            daily_rate: this.state.daily_rate,
            capacity: this.state.capacity,
            type: this.state.type,
        }

        this.props.addOffice(office)
    }

    renderHeader = () => (
        <Header noLeft>
            <Body>
                <Title>Add Office</Title>
            </Body>
        </Header>
    )

    renderAddress = () => (
        <Item>
            <Input placeholder='Address' onChange={this.onAddressChange} />
        </Item>
    )

    renderDistrict = () => (
        <Item>
            <Input placeholder='District' onChange={this.onDistrictChange} />
        </Item>
    )

    renderNumber = () => (
        <Item>
            <Input placeholder='Number' keyboardType='numeric' onChange={this.onNumberChange} />
        </Item>
    )

    renderCity = () => (
        <Item>
            <Input placeholder='City' onChange={this.onCityChange} />
        </Item>
    )

    renderType = () => (
        <Item picker style={styles.picker}>
            <Label>Office type:</Label>
            <Picker
                mode='dropdown'
                selectedValue={this.state.type}
                onValueChange={this.onTypeChange}
            >
                <Picker.Item label='Residential' value='residential' />
                <Picker.Item label='Business' value='business' />
            </Picker>
        </Item>
    )

    renderDailyRate = () => (
        <Item>
            <Input placeholder='Daily Rate' keyboardType='numeric' onChange={this.onDailyRateChange} />
        </Item>
    )

    renderCapacity = () => (
        <Item>
            <Input placeholder='Capacity' keyboardType='numeric' onChange={this.onCapacityChange} />
        </Item>
    )

    renderDescription = () => (
        <Item regular last>
            <Input placeholder='Description' onChange={this.onDescriptionChange} />
        </Item>
    )

    renderForm = () => (
        <Form>
            {this.renderAddress()}
            {this.renderDistrict()}
            {this.renderNumber()}
            {this.renderCity()}
            {this.renderType()}
            {this.renderCapacity()}
            {this.renderDailyRate()}
            {this.renderDescription()}
        </Form>
    )

    renderAddButton = () => (
        <Button style={styles.addButton} onPress={this.onPressAdd}>
            <Text>Add</Text>
        </Button>
    )

    renderErrorText = () => (
        <Text style={styles.errorText}>{this.state.errorAdding}</Text>
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
                <Content>
                    {this.renderForm()}
                    {this.renderAddButton()}
                    {this.renderErrorText()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.AuthReducer.user,
    loading: state.LandmasterReducer.loading,
    errorAdding: state.LandmasterReducer.errorAdding,
})


const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        paddingHorizontal: 20
    },
    addButton: {
        alignSelf: 'center',
        marginTop: 64
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 64
    }
});

export default connect(
    mapStateToProps,
    { addOffice }
)(EditOfficeScreen)