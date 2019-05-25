import React, {Component} from 'react';
import {Title,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoUsuario } from '../controlador/GestionUsuarios';
import { infoSubasta, consultarFavorito, crearFavorito, eliminarFavorito } from '../controlador/GestionPublicaciones';
import * as firebase from 'firebase'

let foto=''

class Venta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosProducto: [],
            datosVendedor: [],
            login: '',
			id: '',
			esFavorito: ""
        }
    }

    async componentDidUpdate(){
        if (this.state.id != this.props.navigation.state.params.id){
            const token = await AsyncStorage.getItem('userToken')
            if (token === undefined || token === null) {
                console.log("no existe token")
            }
            else{
                const decoded = jwt_decode(token)
                const usuario = {
                    login: decoded.identity.login
                }
                this.setState({
                    id: this.props.navigation.state.params.id
                })
                infoSubasta(this.state.id).then(data => {
                    this.setState({
                        login: decoded.identity.login,
                        datosProducto: data
                    })
                })
                infoUsuario(this.state.datosProducto[5]).then(data => {
                    this.setState({
                        datosVendedor: data
                    })
				})
				const producto = {
					usuario: decoded.identity.login
				}
				consultarFavorito(producto,this.props.navigation.state.params.id).then(data => {
					this.setState({
						esFavorito: data
					})
				})
            }
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
            this.setState({
                id: this.props.navigation.state.params.id
            })
            infoVenta(this.state.id).then(data => {
                this.setState({
                    login: decoded.identity.login,
                    datosProducto: data
                })
            })
            infoUsuario(this.state.datosProducto[5]).then(data => {
                this.setState({
                    datosVendedor: data
                })
			})
			const producto = {
				usuario: decoded.identity.login
			}
			consultarFavorito(producto,this.props.navigation.state.params.id).then(data => {
				this.setState({
					esFavorito: data
				})
			})
        }
	}

	botonFavorito(){
		if (this.state.esFavorito == "Favorito existe"){
			return <Text style={styles.añadido}>Añadido</Text>
		}
		else{
			return <Text style={styles.favorito}>Favorito</Text>
		}
	}

	cambiarFavorito(){
		const producto = {
			usuario: this.state.login
		}
		if(this.state.esFavorito == "Favorito existe"){
			eliminarFavorito(producto,this.state.id)
			this.setState({
				esFavorito: "Favorito no existe"
			})
		}
		else if(this.state.esFavorito == "Favorito no existe"){
			crearFavorito(producto,this.state.id)
			this.setState({
				esFavorito: "Favorito existe"
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
						source={{uri: this.state.datosProducto[4]}}/>
					<View style={styles.horizontal}>
                    	<Text style={styles.tipoPublicacion}>Subasta</Text>
						<TouchableOpacity onPress={() => this.cambiarFavorito()}>
							{ this.botonFavorito() }
						</TouchableOpacity>
					</View>
					<View style={styles.itemsContainer}>
                        <Text style={styles.subtitle}>{this.state.datosProducto[1]}</Text>
                        <Text style={styles.cuerpoVerde}>Precio salida</Text>
                        <Text style={styles.title}>{this.state.datosProducto[6]}€</Text>
                        <Text style={styles.cuerpoVerde}>Precio actual</Text>
                        <Text style={styles.title}>{this.state.datosProducto[7]}€</Text>
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
						<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProductList') }>
							<Text style={styles.buttonText}>Enviar mensaje al vendedor </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProductList') }>
							<Text style={styles.buttonText}>Pujar</Text>
						</TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack() }>
							<Text style={styles.buttonText}>Volver</Text>
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
    },
    favorito: {
        fontSize: 17,
        width: 80,
        marginTop: 5,
        marginRight: 10,
        borderWidth: 3.5,
        borderColor: '#ffc400',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'flex-start',
        color: '#ffc400'
    },
    añadido: {
        fontSize: 17,
        width: 80,
        marginTop: 5,
        marginRight: 10,
        borderWidth: 3.5,
        borderColor: '#ffc400',
        borderRadius: 15,
        backgroundColor: '#ffc400',
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'flex-start',
        color: 'white'
    },
	horizontal: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
})

export default Venta;
