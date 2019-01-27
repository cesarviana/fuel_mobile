import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class FuelValueOption extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.props.selected ? 'blue' : 'gray'}]}>
                <TouchableOpacity
                    onPress={this.props.onSelect.bind(this, this.props.value)}
                >
                    <Text style={styles.valueOption}>{this.props.value.toString()}</Text>
                </TouchableOpacity>
                <Text style={styles.liters}>{this.props.liters}</Text>
            </View>
        )
    }
}
const COLOR = 'white';
const styles = StyleSheet.create({
    container: {
        width: 120
    },
    valueOption: {
        fontSize: 30,
        height: 50,
        textAlign: 'center',
        color: COLOR,
        fontWeight: 'bold'
    },
    liters : {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLOR
    }
});
