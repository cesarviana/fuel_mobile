import React, {Component} from 'react'
import {View, Text, ScrollView, FlatList} from 'react-native'

import fuelService from '../services/FuelService'

export default class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <FlatList data={this.props.list}
                          renderItem={({item}) => <Text>{ 'x' + item.value}</Text>}
                />
            </ScrollView>
        )
    }
}
