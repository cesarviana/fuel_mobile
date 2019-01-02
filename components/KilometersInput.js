import React, {Component} from 'react'
import {View, Text, TextInput } from 'react-native'

export default class KilometersInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kilometers: props.previousKilometers.toString()
        }
    }

    setKilometers(kilometers){
        this.setState({kilometers});
        this.props.onChange(Number(kilometers));
    }

    render() {
        return (
            <View>
                <Text>KM atual</Text>
                <TextInput onChangeText={(kilometers)=>this.setKilometers(kilometers)}
                           keyboardType='numeric'
                           value={this.state.kilometers}
                />
            </View>
        )
    }
}
