import React, { Component } from 'react';

import {
    StyleSheet,
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
    Text,
    CheckBox,
} from 'native-base'

import Loading from '../common/Loading'

import { searchOffices } from '../../redux/actions/TenantActions'
import { connect } from 'react-redux'

class SearchScreen extends Component {
    state = {
        loading: false,
        errorSearching: '',

        description: { enabled: false, value: null },
        type: { enabled: false, value: null },
        available_now: false,
        city: { enabled: false, value: null },
        district: { enabled: false, value: null },
        min_price: { enabled: false, value: null },
        max_price: { enabled: false, value: null },
        capacity: { enabled: false, value: null },
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorSearching: this.props.errorSearching,
            })
        }
    }


    toggle = field => {
        field.enabled = !field.enabled

        if (!field.enabled)
            field.value = null

        return field
    }

    change = (field, value) => {
        field.value = value
        return field
    }

    onPressSearch = () => {
        const filter = {
            description: this.state.description.value,
            type: this.state.type.value,
            available_now: this.state.available_now,
            city: this.state.city.value,
            district: this.state.district.value,
            min_price: this.state.min_price.value,
            max_price: this.state.max_price.value,
            capacity: this.state.capacity.value,
        }

        this.props.searchOffices(filter)
    }

    onDescriptionCheck = () => this.setState({ description: this.toggle(this.state.description) })
    onTypeCheck = () => this.setState({ type: this.toggle(this.state.type) })
    onAvailableNowCheck = () => this.setState({ available_now: !this.state.available_now })
    onCityCheck = () => this.setState({ city: this.toggle(this.state.city) })
    onDistrictCheck = () => this.setState({ district: this.toggle(this.state.district) })
    onMinPriceCheck = () => this.setState({ min_price: this.toggle(this.state.min_price) })
    onMaxPriceCheck = () => this.setState({ max_price: this.toggle(this.state.max_price) })
    onCapacityCheck = () => this.setState({ capacity: this.toggle(this.state.capacity) })

    onDescriptionChange = description => this.setState({ description: this.change(this.state.description, description) })
    onTypeChange = type => this.setState({ type: this.change(this.state.type, type) })
    onCityChange = city => this.setState({ city: this.change(this.state.city, city) })
    onDistrictChange = district => this.setState({ district: this.change(this.state.district, district) })
    onMinPriceChange = min_price => this.setState({ min_price: this.change(this.state.min_price, min_price) })
    onMaxPriceChange = max_price => this.setState({ max_price: this.change(this.state.max_price, max_price) })
    onCapacityChange = capacity => this.setState({ capacity: this.change(this.state.capacity, capacity) })

    renderHeader = () => (
        <Header noLeft>
            <Body>
                <Title>Search Office</Title>
            </Body>
        </Header>
    )

    renderDescription = () => (
        <Item>
            <CheckBox
                style={styles.commonCheckbox}
                onPress={this.onDescriptionCheck}
                checked={this.state.description.enabled}
            />
            <Input
                placeholder='Description'
                disabled={!this.state.description.enabled}
                value={this.state.description.value}
                onChangeText={this.onDescriptionChange}
            />
        </Item>
    )

    renderType = () => (
        <Item>
            <CheckBox
                style={styles.commonCheckbox}
                onPress={this.onTypeCheck}
                checked={this.state.type.enabled}
            />
            <Label style={styles.typeLabel}>Office type:</Label>
            <Picker
                enabled={this.state.description.enabled}
                mode='dropdown'
                selectedValue={this.state.type.value}
                onValueChange={this.onTypeChange}
            >
                <Picker.Item label='Residential' value='residential' />
                <Picker.Item label='Business' value='business' />
            </Picker>
        </Item>
    )

    renderAvailableNow = () => (
        <Item>
            <CheckBox
                style={styles.availableNowCheckbox}
                onPress={this.onAvailableNowCheck}
                checked={this.state.available_now}
            />
            <Label style={styles.availableNowLabel}>Available Now</Label>
        </Item>
    )

    renderCity = () => (
        <Item>
            <CheckBox
                style={styles.commonCheckbox}
                onPress={this.onCityCheck}
                checked={this.state.city.enabled}
            />
            <Input
                placeholder='City'
                disabled={!this.state.city.enabled}
                value={this.state.city.value}
                onChangeText={this.onCityChange}
            />
        </Item>
    )

    renderDistrict = () => (
        <Item>
            <CheckBox
                style={styles.commonCheckbox}
                onPress={this.onDistrictCheck}
                checked={this.state.district.enabled}
            />
            <Input
                placeholder='District'
                disabled={!this.state.district.enabled}
                value={this.state.district.value}
                onChangeText={this.onDistrictChange}
            />
        </Item>
    )

    renderMinPrice = () => (
        <Item>
            <CheckBox
                style={styles.commonCheckbox}
                onPress={this.onMinPriceCheck}
                checked={this.state.min_price.enabled}
            />
            <Input
                keyboardType='numeric'
                placeholder='Min price'
                disabled={!this.state.min_price.enabled}
                value={this.state.min_price.value}
                onChangeText={this.onMinPriceChange}
            />
        </Item>
    )

    renderMaxPrice = () => (
        <Item>
            <CheckBox
                style={styles.commonCheckbox}
                onPress={this.onMaxPriceCheck}
                checked={this.state.max_price.enabled}
            />
            <Input
                keyboardType='numeric'
                placeholder='Max price'
                disabled={!this.state.max_price.enabled}
                value={this.state.max_price.value}
                onChangeText={this.onMaxPriceChange}
            />
        </Item>
    )

    renderCapacity = () => (
        <Item>
            <CheckBox
                style={styles.commonCheckbox}
                onPress={this.onCapacityCheck}
                checked={this.state.capacity.enabled}
            />
            <Input
                keyboardType='numeric'
                placeholder='Capacity'
                disabled={!this.state.capacity.enabled}
                value={this.state.capacity.value}
                onChangeText={this.onCapacityChange}
            />
        </Item>
    )

    renderSearchForm = () => (
        <Form>
            {this.renderDescription()}
            {this.renderType()}
            {this.renderAvailableNow()}
            {this.renderCity()}
            {this.renderDistrict()}
            {this.renderMinPrice()}
            {this.renderMaxPrice()}
            {this.renderCapacity()}
        </Form>
    )

    renderSearchButton = () => (
        <Button style={styles.searchButton} onPress={this.onPressSearch}>
            <Text>Search</Text>
        </Button>
    )

    renderErrorText = () => (
        <Text style={styles.errorText}>{this.state.errorSearching}</Text>
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
                    {this.renderSearchForm()}
                    {this.renderSearchButton()}
                    {this.renderErrorText()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.TenantReducer.loading,
    errorSearching: state.TenantReducer.errorSearching,
    searchResult: state.TenantReducer.searchResult
})

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonCheckbox: {
        marginRight: 16
    },
    typeLabel: {
        marginLeft: 4
    },
    availableNowCheckbox: {
        marginRight: 8
    },
    availableNowLabel: {
        padding: 12
    },
    searchButton: {
        alignSelf: 'center',
        marginTop: 64
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 64
    }
})

export default connect(
    mapStateToProps,
    { searchOffices }
)(SearchScreen)