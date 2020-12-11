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

import {
    addOffice,
    modifyOffice,
    excludeOffice
} from '../../redux/actions/LandmasterActions'

import { connect } from 'react-redux'

class EditOfficeScreen extends Component {
    state = {
        loading: false,
        errorAdding: '',
        errorModifying: '',
        errorExcluding: '',
        address: '',
        district: '',
        number: '',
        city: '',
        type: 'residential',
        daily_rate: '',
        capacity: '',
        description: '',
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorAdding: this.props.errorAdding,
                errorModifying: this.props.errorModifying,
                errorExcluding: this.props.errorExcluding,
            })
        }
    }

    componentDidMount() {
        if (this.props.office !== undefined) {
            const { office } = this.props
            this.setState({
                address: office.address,
                district: office.district,
                number: office.number,
                city: office.city,
                type: office.type,
                daily_rate: office.daily_rate,
                capacity: office.capacity,
                description: office.description,
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
            number: Number(this.state.number),
            description: this.state.description,
            daily_rate: Number(this.state.daily_rate),
            capacity: Number(this.state.capacity),
            type: this.state.type,
        }

        this.props.addOffice(office)
    }

    onPressModify = () => {
        const { office } = this.props

        office.city = this.state.city
        office.address = this.state.address
        office.number = this.state.number
        office.description = this.state.description
        office.daily_rate = this.state.daily_rate
        office.capacity = this.state.capacity
        office.type = this.state.type

        this.props.modifyOffice(office)
    }

    onPressExclude = () => {
        const { office: { officeId: office_id } } = this.props
        this.props.excludeOffice(office_id)
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
            <Input
                placeholder='Address'
                onChangeText={this.onAddressChange}
                value={this.state.address}
            />
        </Item>
    )

    renderDistrict = () => (
        <Item>
            <Input
                placeholder='District'
                onChangeText={this.onDistrictChange}
                value={this.state.district}
            />
        </Item>
    )

    renderNumber = () => (
        <Item>
            <Input
                placeholder='Number'
                keyboardType='numeric'
                onChangeText={this.onNumberChange}
                value={String(this.state.number)}
            />
        </Item>
    )

    renderCity = () => (
        <Item>
            <Input
                placeholder='City'
                onChangeText={this.onCityChange}
                value={this.state.city}
            />
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
            <Input
                placeholder='Daily Rate'
                keyboardType='numeric'
                onChangeText={this.onDailyRateChange}
                value={String(this.state.daily_rate)}
            />
        </Item>
    )

    renderCapacity = () => (
        <Item>
            <Input
                placeholder='Capacity'
                keyboardType='numeric'
                onChangeText={this.onCapacityChange}
                value={String(this.state.capacity)}
            />
        </Item>
    )

    renderDescription = () => (
        <Item regular last>
            <Input
                placeholder='Description'
                onChangeText={this.onDescriptionChange}
                value={this.state.description}
            />
        </Item>
    )

    renderForm = () => (
        <Form style={styles.form}>
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
        <Button style={styles.button} onPress={this.onPressAdd}>
            <Text>Add</Text>
        </Button>
    )

    renderUpdateButton = () => (
        <Button style={styles.button} onPress={this.onPressModify}>
            <Text>Update</Text>
        </Button>
    )

    renderDeleteButton = () => (
        <Button danger style={styles.button} onPress={this.onPressExclude}>
            <Text>Delete</Text>
        </Button>
    )

    renderButtons = () => {
        if (this.props.office !== undefined) {
            return (
                <Content>
                    {this.renderUpdateButton()}
                    {this.renderDeleteButton()}
                </Content>
            )
        }

        return this.renderAddButton()
    }

    renderErrorText = text => (
        <Text style={styles.errorText}>{text}</Text>
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
                    {this.renderButtons()}
                    {this.renderErrorText(this.state.errorAdding)}
                    {this.renderErrorText(this.state.errorModifying)}
                    {this.renderErrorText(this.state.errorExcluding)}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.AuthReducer.user,
    loading: state.LandmasterReducer.loading,
    errorAdding: state.LandmasterReducer.errorAdding,
    errorModifying: state.LandmasterReducer.errorModifying,
    errorExcluding: state.LandmasterReducer.errorExcluding,
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
    form: {
        marginBottom: 16
    },
    button: {
        alignSelf: 'center',
        margin: 8,
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
    }
});

export default connect(
    mapStateToProps,
    {
        addOffice,
        modifyOffice,
        excludeOffice
    }
)(EditOfficeScreen)