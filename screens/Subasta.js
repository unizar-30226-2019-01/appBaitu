import React, {Component} from 'react';
import {Title,TextInput,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage,Dimensions} from 'react-native';
import { LinearGradient } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoUsuario } from '../controlador/GestionUsuarios';
import { infoSubasta, consultarFavorito, crearFavorito, eliminarFavorito, realizarOfertaSubasta, getFotos } from '../controlador/GestionPublicaciones';
import * as firebase from 'firebase';
import Gallery from 'react-native-image-gallery';

let foto=''

class Subasta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosProducto: [],
            datosVendedor: [],
            login: '',
			id: '',
			esFavorito: "",
            puja: '',
            respuestaBD: '',
            fotos: [],
            images: '',
            image1:'',
            image2:'',
            image3:''
        }
    }

    async pujar(){
        if(this.state.puja <= this.state.datosProducto[7]){
            Alert.alert('','Por favor, introduce un valor mayor al precio actual antes de pujar',[{text: 'OK'}],{cancelable: false});
        }
        else{
            console.log(this.state.id)
            console.log(this.state.puja)
            console.log(this.state.login)
            await realizarOfertaSubasta(this.state.login,this.state.id,this.state.puja).then(data => {
                this.setState({
                    respuestaBD: data
                })
            })
            if(this.state.respuestaBD === "OK"){
                Alert.alert('','¡Se ha realizado la puja correctamente!',[{text: 'OK'}],{cancelable: false});
                this.props.navigation.goBack()
            }
            else{
                Alert.alert('','No se ha podido realizar la puja',[{text: 'OK'}],{cancelable: false});
            }
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
                await getFotos(this.state.id).then(data => {
                    this.setState({
                     fotos: data
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
            await getFotos(this.state.id).then(data => {
                this.setState({
                 fotos: data
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
            <Gallery
                style={styles.image}
                images={[
                  { source: { uri: this.state.datosProducto[4]}, },
                  { source: { uri: this.state.image1[0] }, },
                  { source: { uri: this.state.image2[0] }, },
                  { source: { uri: this.state.image3[0] }, }
                ]}
              />
					<View style={styles.horizontal}>
                    	<Text style={styles.subasta}>Subasta</Text>
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
                        <Text style={styles.cuerpoVerde}>Haz tu puja aqui</Text>
                        <TextInput style={styles.inputBox}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          placeholder="Introduce aquí la cantidad(€)..."
                          placeholderTextColor = "#BCC5D5"
                      	  autoCorrect={false}
                          keyboardType={'numeric'}
                          type="number"
                          value={this.state.precio}
                          onChangeText={(puja) => this.setState({puja})}
                        />
						<TouchableOpacity style={styles.button} onPress={() => this.pujar() }>
							<Text style={styles.buttonText}>Pujar</Text>
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
        backgroundColor: 'gray',
        height: (Dimensions.get('window').width)*0.75,
        width: Dimensions.get('window').width,
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
	subasta: {
		fontSize: 15,
		width: 70,
		marginTop: 5,
		marginLeft: 5,
		borderWidth: 3.5,
		borderColor: '#fea041',
		borderRadius: 15,
		backgroundColor: '#fea041',
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

export default Subasta;
