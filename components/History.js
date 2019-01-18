import React, {Component} from 'react'
import {ScrollView, FlatList} from 'react-native'

import HistoryItem from './HistoryItem'

export default class History extends Component {
    constructor(props) {
        super(props);
        this.onSelect = props.onSelect || function () {}
    }

    render() {
        return (
            <ScrollView>
                <FlatList data={this.props.list}
                          renderItem={({item}) => <HistoryItem onSelect={(item)=>this.onSelect(item)} item={item}/>}
                />
            </ScrollView>
        )
    }
}
