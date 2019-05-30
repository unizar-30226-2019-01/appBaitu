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
            i1: '',
            i2: '',
            i3: '',
            image1: '',
            image2: '',
            image3: ''
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
                await getFotos(this.state.datosProducto[1]).then(data => {
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
            console.log("ESKEREEEEEEEEEEEEEEEEE: "+this.state.datosProducto)
            await getFotos(this.state.datosProducto[1]).then(data => {
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

    render(){
        return(
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
				<Gallery
					style={styles.image}
					images={[
						{ source: { uri: this.state.datosProducto[5]}, },
						{ source: { uri: this.state.i1 }, },
						{ source: { uri: this.state.i2 }, },
						{ source: { uri: this.state.i3 }, }
					]}
				/>
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
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Calificar') }>
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
