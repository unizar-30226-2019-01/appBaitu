import React, {Component} from 'react';
import {Text,View} from 'react-native';
export default class Calificar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            login: ''
        }
    }
    render(){
        return(
        <View>
            <Text>Calificar</Text>
        </View>
        )
    }
}
