import React, {Component} from 'react'

import FlashMessage from "react-native-flash-message";

export default class Message extends Component {
    render() {
        return (
            <FlashMessage ref="myMessage"/>
        )
    }
}