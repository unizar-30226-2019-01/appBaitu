import React, {Component} from 'react';
import {Title,Alert,BackHandler,TextInput,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage,Dimensions} from 'react-native';
import { LinearGradient } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoUsuario } from '../controlador/GestionUsuarios';
import { infoVenta, consultarFavorito, crearFavorito, eliminarFavorito, getFotos, realizarOferta, comprador } from '../controlador/GestionPublicaciones';
import Gallery from 'react-native-image-gallery';


class Venta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosProducto: [],
            fotos: [],
        }
    }


    async componentDidUpdate(){
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
                    datosProducto: this.props.navigation.state.params.datosProducto
                })
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
                datosProducto: this.props.navigation.state.params.datosProducto
            })
            console.log("Producto")
            console.log(this.state.datosProducto)
            console.log("foto")
            console.log(this.state.datosProducto[5])
        }
	}

    render(){
        return(
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
            <Image
                style={styles.image}
                source={{uri: this.state.datosProducto[5]}}/>

					<View style={styles.itemsContainer}>
                        <Text style={styles.title}>{this.state.datosProducto[0]}</Text>
                        <Text style={styles.cuerpoVerde}>Categoría</Text>
						<Text style={styles.cuerpo}>{this.state.datosProducto[4]}</Text>
						<Text style={styles.cuerpoVerde}>Descripción</Text>
						<Text style={styles.cuerpo}>{this.state.datosProducto[2]}</Text>
						<Text style={styles.cuerpoVerde}>Vendedor</Text>
						<TouchableOpacity style={styles.link} onPress={() => {
                            if(this.state.login === this.state.datosProducto[3]){
                                this.props.navigation.navigate('Profile')
                            }
                            else{
                                this.props.navigation.navigate('ProfileAjeno', {login:this.state.datosProducto[3],producto:this.state.datosProducto[1]})
                            }
                        }}>
							<Text style={styles.clickableText}>{this.state.datosProducto[3]}</Text>
						</TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Calificar', {producto: this.state.datosProducto[1], datosProducto: this.state.datosProducto}) }>
							<Text style={styles.buttonText}>Calificar publicación</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProductList') }>
							<Text style={styles.buttonText}>Enviar mensaje al vendedor</Text>
						</TouchableOpacity>
            			<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack() }>
							<Text style={styles.buttonText}>Volver</Text>
						</TouchableOpacity>
					</View>
      	  </LinearGradient>
        </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    image: {
		flex: 1,
		height: (Dimensions.get('window').width),
		alignItems: 'center',
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
    venta: {
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
