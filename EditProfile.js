import React, {Component} from 'react';
import {Title,Text,View,Image,TextInput,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight} from 'react-native';
import { LinearGradient } from 'expo';
import EditProfile from './EditProfile.js';



class Profile extends Component {
    render(){
        return(
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Image style={styles.imagenPerfil}
                            source={require('../assets/images/bichardo.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.price}>78
                        <Image
                            style={styles.estrella}
                            source={require('../assets/images/estrella.png')}/>
                    </Text>
                    <Text style={styles.title}>Cristiano Ronaldo</Text>
                    <View style={styles.itemsContainer}>
                        <Text style={styles.cuerpoVerde}>Correo</Text>
                        <TextInput style={styles.inputBox}
                            keyboardType="email-address"
                            defaultValue='cr7championsleague@gmail.com'
                            clearButtonMode='while-editing'
                            editable={true}
                            />
                        <Text style={styles.cuerpoVerde}>Teléfono</Text>
                        <TextInput style={styles.inputBox}
                            keyboardType={'numeric'}
                            defaultValue='634543856'
                            clearButtonMode='while-editing'
                            editable={true}
                            />
                        <Text style={styles.cuerpoVerde}>Dirección</Text>
                        <TextInput style={styles.inputBox}
                            defaultValue='Residenciale Milloneti 7, Torino'
                            clearButtonMode='while-editing'
                            editable={true}
                            />
                        <Text></Text>
                        <Text></Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>DESCARTAR CAMBIOS</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
        </LinearGradient>
        </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    imagenPerfil: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    price: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    estrella: {
        width: 20,
        height: 20
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 17,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize:20,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
    },
    itemsContainer : {
        flexGrow: 1,
        margin: 20,
        //justifyContent:'flex-start'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    correo: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 20,
        textAlign: 'left',
        fontStyle: 'italic'
    },
    cuerpo: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 20,
        overflow: 'hidden',
        textAlign: 'left'
    },
    cuerpoVerde: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 5,
        borderColor: '#B4FFAB',
        borderRadius: 15,
        paddingHorizontal: 7,
        backgroundColor: '#B4FFAB',
        overflow: 'hidden',
        textAlign: 'center'
    },
    inputBox: {
        fontSize: 20,
        marginTop: 5,
        overflow: 'hidden',
        textAlign: 'left',
        paddingHorizontal: 7,
        borderColor: '#777777',
        borderWidth: 1
    }
})

export default Profile;
