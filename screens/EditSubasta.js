import React, {Component} from 'react';
import {Title,Picker, TimePickerAndroid, DatePickerAndroid,TextInput,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoUsuario } from '../controlador/GestionUsuarios';
import { infoSubasta, consultarFavorito, crearFavorito, eliminarFavorito, getTipoPublicacion } from '../controlador/GestionPublicaciones';

class Subasta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosProducto: [],
            login: '',
			id: '',
            descripcion: '',
            nombre: '',
            categoria: ''
        }
    }

    editarPublicacion(){
        if (this.state.categoria == ''){
            Alert.alert('','Por favor, selecciona la categoría',[{text: 'OK'}],{cancelable: false});

        }
        else {

        }
        // LLAMAR AQUI A LA FUNCION DEL BACK PARA ACTUALIZAR LAS SUBASTAS XDXDXDDXDXDXDXDXDXDXDXDXDX
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
        }
        this.setState({
             nombre: this.state.datosProducto[1],
             descripción: this.state.datosProducto[2],
             categoria: this.state.datosProducto[3],
             fechaFin: this.state.datosProducto[8],
             horaFin: this.state.datosProducto[9]
         })
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
                    	<Text style={styles.subasta}>Subasta</Text>
					</View>
					<View style={styles.itemsContainer}>
                    <Text style={styles.cuerpoVerde}>Nombre</Text>
                    <TextInput style={styles.inputBox}
                        defaultValue={this.state.datosProducto[1]}
                        clearButtonMode='while-editing'
                        editable={true}
                        onChangeText={(nombre) => this.setState({nombre})}
                        onChange={this.onChange}
                        />
						<Text style={styles.cuerpoVerde}>Descripción</Text>
                        <TextInput style={styles.inputBox}
                            defaultValue={this.state.datosProducto[2]}
                            clearButtonMode='while-editing'
                            editable={true}
                            onChangeText={(descripcion) => this.setState({descripcion})}
                            onChange={this.onChange}
                            />
                        <Text style={styles.cuerpoVerde}>Categoría</Text>
                        <Picker
                              defaultValue={this.state.datosProducto[3]}
                              selectedValue={this.state.categoria}
                              style={styles.picker}
                              onPress={() => Keyboard.dismiss()}
                              onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})
                        }>
                            <Picker.Item label="Coches" value="Coches" />
                            <Picker.Item label="Electrónica" value="Electrónica" />
                            <Picker.Item label="Telefonía" value="Telefonía" />
                            <Picker.Item label="Deporte" value="Deporte" />
                            <Picker.Item label="Inmobiliaria" value="Inmobiliaria" />
                            <Picker.Item label="Motos" value="Motos" />
                            <Picker.Item label="Bicicletas" value="Bicicletas" />
                            <Picker.Item label="Videojuegos" value="Videojuegos" />
                            <Picker.Item label="Hogar" value="Hogar" />
                            <Picker.Item label="Moda" value="Moda" />
                            <Picker.Item label="Electrodomésticos" value="Electrodomésticos" />
                            <Picker.Item label="Libros y Música" value="Libros y Música" />
                            <Picker.Item label="Niños" value="Niños" />
                            <Picker.Item label="Empleo" value="Empleo" />
                            <Picker.Item label="Construcción" value="Construcción" />
                            <Picker.Item label="Coleccionismo" value="Coleccionismo" />
                        </Picker>

						<TouchableOpacity style={styles.button} onPress={() => this.editarPublicacion() }>
							<Text style={styles.buttonText}>Guardar Cambios </Text>
						</TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack() }>
							<Text style={styles.buttonText}>Descartar Cambios</Text>
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
    inputBox: {
        fontSize: 20,
        marginTop: 5,
        overflow: 'hidden',
        textAlign: 'left',
        paddingHorizontal: 7,
        borderColor: '#777777',
        borderWidth: 1
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
