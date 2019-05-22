import React, {Component} from 'react';
import {Text,View,TouchableHighlight,Icon,Image} from 'react-native';
import {StackNavigator} from 'react-navigation';

import ProductList from '../screens/ProductList.js';


export default class HomeButton extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        const { navigation } = this.props;
        return(
            <View>
                <TouchableHighlight onPress={() => {
                        navigation.navigate('ProductList');
                    }}>
                    <Image
                        style={{width: 100, height: 32}}
                        source={require('../assets/images/logo_nobg+title.png')}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}
