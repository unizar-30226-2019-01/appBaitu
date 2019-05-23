import React, {Component} from 'react';
import {Dimensions,Title,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoVenta } from '../controlador/GestionUsuarios';
import { infoUsuario } from '../controlador/GestionUsuarios.js'
import * as firebase from 'firebase'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

let foto=''

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
			login: ''
        }
    }

    async componentDidMount() {
        infoVenta('103').then(data => {
            this.setState({
                datos: data
            },
            () => {
                console.log("devuelvo")
            })
          })
		/*const token = await AsyncStorage.getItem('userToken')
		if (token === undefined || token === null) {
			console.log("no existe token")
		}
		else{
            const decoded = jwt_decode(token)
            const usuario = {
                login: decoded.identity.login
            }
            infoUsuario(decoded.identity.login).then(data => {*/
		//})
            //this.getAll(usuario)
        //}
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
                    <Text style={styles.title}>{this.state.datos[1]} - {this.state.datos[6]}€</Text>
					<View style={styles.itemsContainer}>
						<Text style={styles.cuerpoVerde}>Descripción</Text>
						<Text style={styles.cuerpo}>{this.state.datos[2]}</Text>
						<Text style={styles.cuerpoVerde}>Vendedor</Text>
						<TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Profile')}>
							<Text style={styles.clickableText}>{this.state.datos[5]}</Text>
						</TouchableOpacity>
						<Text style={styles.price}>78
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
          //width: imageWidth,
          //height: 300,
          overflow: 'hidden',
          marginBottom: 5,
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
        //justifyContent:'flex-start'
    },
    button: {
        alignItems: 'center',
        textAlign: 'center',
        // width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold'
  },
  tipoPublicacion: {
      fontSize: 17,
      width: 80,
	//marginTop: 5,
	marginLeft: 5,
      borderWidth: 3.5,
      borderColor: '#B4FFAB',
      borderRadius: 15,
      backgroundColor: '#B4FFAB',
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

export default Product;
