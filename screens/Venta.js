import React, {Component} from 'react';
import {Dimensions,Title,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoUsuario } from '../controlador/GestionUsuarios';
import { infoVenta } from '../controlador/GestionPublicaciones';
import * as firebase from 'firebase'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

let foto=''

class Venta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosProducto: [],
            datosVendedor: [],
			login: '',
        }
    }

async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken')
    if (token === undefined || token === null) {
        console.log("no existe token")
    }
    else{
        const decoded = jwt_decode(token)
        const usuario = {
            login: decoded.identity.login
        }
        infoVenta('103').then(data => {
            this.setState({
                login: decoded.identity.login,
                datosProducto: data
            },
            () => {
                console.log(this.state.login)
            })
        })
        infoUsuario(this.state.datosProducto[5]).then(data => {
            this.setState({
                datosVendedor: data
            },
            () => {
                console.log("devuelvo")
            })
        })
    }
}

    render(){
        return(
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Image
						style={styles.image}
						source={require('../assets/images/ipad.jpg')}/>
                    <Text style={styles.tipoPublicacion}>Venta</Text>
					<View style={styles.itemsContainer}>
                        <Text style={styles.title}>{this.state.datosProducto[6]}€</Text>
                        <Text style={styles.subtitle}>{this.state.datosProducto[1]}</Text>
						<Text style={styles.cuerpoVerde}>Descripción</Text>
						<Text style={styles.cuerpo}>{this.state.datosProducto[2]}</Text>
						<Text style={styles.cuerpoVerde}>Vendedor</Text>
						<TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Profile')}>
							<Text style={styles.clickableText}>{this.state.datosProducto[5]}</Text>
						</TouchableOpacity>
						<Text style={styles.price}>{this.state.datosVendedor[6]}
							<Image
								style={styles.estrella}
								source={require('../assets/images/estrella.png')}/>
						</Text>
						<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProductList')}>
							<Text style={styles.buttonText}>Guardar en favoritos </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProductList') }>
							<Text style={styles.buttonText}>Enviar mensaje al vendedor </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProductList') }>
							<Text style={styles.buttonText}>Hacer oferta </Text>
						</TouchableOpacity>
					</View>
                </KeyboardAvoidingView>
      	  </LinearGradient>
        </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    image: {
        overflow: 'hidden',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'white',
        textAlign:'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    estrella: {
        width: 20,
        height: 20
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
    cuerpo: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        overflow: 'hidden',
        textAlign: 'left'
    },
    cuerpoNegrita: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        overflow: 'hidden',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    price: {
        fontSize: 25,
        alignSelf: 'center'
    },
    itemsContainer : {
        flexGrow: 1,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    button: {
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    subtitle: {
        fontSize: 25,
        textAlign: 'left',
        marginLeft: 20,
    },
    tipoPublicacion: {
        fontSize: 17,
        width: 65,
        marginTop: 5,
        marginLeft: 10,
        borderWidth: 3.5,
        borderColor: '#8dff7f',
        borderRadius: 15,
        backgroundColor: '#8dff7f',
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'flex-start',
        color: 'black'
    },
    clickableText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
})

export default Venta;
