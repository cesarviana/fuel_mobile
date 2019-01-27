import React, {Component} from 'react'
import {Text, View, Button} from 'react-native'
import myMoment from '../services/MyMoment'

export default class HistoryItem extends Component {

    constructor(props) {
        super(props);
        this.item = props.item;
        this.item.date = myMoment.fromNow(this.item.createdAt);
        this.onSelect = props.onSelect || function(){}
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text>R$ {this.item.value} | R$ {this.item.price} | { this.item.date } | { this.item.kilometers } km</Text>
                <Button title={'Editar'} onPress={()=>this.props.onSelect(this.item)}/>
            </View>
        )
    }
}
