import React, {Component} from 'react';
import {Title,Share,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage,Dimensions} from 'react-native';
import { LinearGradient } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoUsuario } from '../controlador/GestionUsuarios';
import { infoVenta, getFotos, consultarFavorito, crearFavorito, eliminarFavorito, eliminarProducto, eliminarSubasta, getTipoPublicacion } from '../controlador/GestionPublicaciones';
import * as firebase from 'firebase'
import Gallery from 'react-native-image-gallery';

let foto=''

class Venta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosProducto: [],
            datosVendedor: [],
            login: '',
			id: '',
			esFavorito: "",
            fotos: [],
            images: '',
            image1:[],
            image2:[],
            image3:[],
            i1:'',
            i2:'',
            i3:''
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
				await getFotos(this.state.id).then(data => {
					this.setState({
						fotos: data
					})
				})
				this.setState({i1:undefined})
				this.setState({i2:undefined})
				this.setState({i3:undefined})
				this.setState({image1: this.state.fotos[0]})
				this.setState({image2: this.state.fotos[1]})
				this.setState({image3: this.state.fotos[2]})

				this.setState({i1: this.state.image1[0]})
				this.setState({i2: this.state.image2[0]})
				this.setState({i3: this.state.image3[0]})

				if(this.state.i1 === undefined || this.state.i1 === '') {
					this.setState({i1:'http://geodezja-elipsa.pl/ikony/picture.png'})
				}
				if(this.state.i2 === undefined || this.state.i2 === '') {
					this.setState({i2:'http://geodezja-elipsa.pl/ikony/picture.png'})
				}
				if(this.state.i3 === undefined || this.state.i3 === '') {
					this.setState({i3:'http://geodezja-elipsa.pl/ikony/picture.png'})
				}
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
			await getFotos(this.state.id).then(data => {
				this.setState({
					fotos: data
				})
			})
			this.setState({i1:undefined})
			this.setState({i2:undefined})
			this.setState({i3:undefined})
			this.setState({image1: this.state.fotos[0]})
			this.setState({image2: this.state.fotos[1]})
			this.setState({image3: this.state.fotos[2]})

			this.setState({i1: this.state.image1[0]})
			this.setState({i2: this.state.image2[0]})
			this.setState({i3: this.state.image3[0]})

			if(this.state.i1 === undefined || this.state.i1 === '') {
				this.setState({i1:'http://geodezja-elipsa.pl/ikony/picture.png'})
			}
			if(this.state.i2 === undefined || this.state.i2 === '') {
				this.setState({i2:'http://geodezja-elipsa.pl/ikony/picture.png'})
			}
			if(this.state.i3 === undefined || this.state.i3 === '') {
				this.setState({i3:'http://geodezja-elipsa.pl/ikony/picture.png'})
			}
        }
	}

    editarPublicacion(){
            this.props.navigation.navigate('EditVenta', {id: this.state.id})
    }

    eliminarPublicacion(){
        eliminarProducto(this.state.id)
        this.props.navigation.goBack()
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

	compartir(){
		const content={
			message: 'Este enlace ha sido enviado desde la app móvil de Baitu\n¡Entra ya!\n\nhttp://52.151.88.18:8080/producto?id=' + this.state.id
		}
		const options={}
		Share.share(content,options)
	}

    render(){
        return(
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
				<Gallery
					style={styles.image}
					images={[
						{ source: { uri: this.state.datosProducto[4]}, },
						{ source: { uri: this.state.i1 }, },
						{ source: { uri: this.state.i2 }, },
						{ source: { uri: this.state.i3 }, }
					]}
				/>
				<View style={styles.horizontal}>
					<Text style={styles.venta}>Venta</Text>
					<TouchableOpacity onPress={() => this.cambiarFavorito()}>
						{ this.botonFavorito() }
					</TouchableOpacity>
				</View>
				<View style={styles.itemsContainer}>
					<Text style={styles.title}>{this.state.datosProducto[6]}€</Text>
					<Text style={styles.subtitle}>{this.state.datosProducto[1]}</Text>
					<Text style={styles.cuerpoVerde}>Descripción</Text>
					<Text style={styles.cuerpo}>{this.state.datosProducto[2]}</Text>
					<Text style={styles.cuerpoVerde}>Ubicación</Text>
					<Text style={styles.cuerpo}>{this.state.datosProducto[7]}</Text>
					<Text style={styles.cuerpoVerde}>Vendedor</Text>
					<TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Profile')}>
						<Text style={styles.clickableText}>{this.state.datosProducto[5]}</Text>
					</TouchableOpacity>
					<Text style={styles.price}>{this.state.datosVendedor[6]}
						<Image
							style={styles.estrella}
							source={require('../assets/images/estrella.png')}/>
					</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MisOfertas', {login: this.state.login, id: this.state.id})}>
                        <Text style={styles.buttonText}>VER OFERTAS</Text>
                    </TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => this.editarPublicacion() }>
						<Text style={styles.buttonText}>Editar publicación</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => this.compartir()}>
							<Text style={styles.buttonText}>Compartir</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack() }>
						<Text style={styles.buttonText}>Volver</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={styles.redbutton} onPress={() => {
                        Alert.alert(
                        "Borrar publicación",
                        "¿Seguro que desea borrar su publicación? La publicación no podrá ser recuperada.",
                        [
                            {
                            text: "No"
                            },
                            { text: "Si", onPress: () =>{this.eliminarPublicacion()} }
                        ],
                        { cancelable: false }
                        );
                        return true;
                        }}>
                        <Text style={styles.buttonText}>ELIMINAR PUBLICACIÓN</Text>
                    </TouchableOpacity>
				</View>
      	  </LinearGradient>
        </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    image: {
        height: Dimensions.get('window').width*0.75,
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
    redbutton: {
        width:300,
        backgroundColor:'#cb3234',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 17,
        alignSelf: 'center'
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
