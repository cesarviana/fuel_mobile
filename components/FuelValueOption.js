import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'

export default class FuelValueOption extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Button title={this.props.value.toString()}
                        onPress={this.props.onSelect.bind(this, this.props.value)}
                        color={this.props.selected ? 'blue' : 'gray'}
                />
                <Text>{this.props.liters}</Text>
            </View>
        )
    }
}
