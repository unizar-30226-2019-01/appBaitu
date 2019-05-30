import React, {Component} from 'react';
import {Text,View,Picker,Alert,TextInput,StyleSheet,LinearGradient,KeyboardAvoidingView,AsyncStorage,TouchableOpacity} from 'react-native';
import {estaValorado, valorarProducto} from '../controlador/GestionPublicaciones'
import jwt_decode from 'jwt-decode';


class Reportar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            producto: '',
            valoracion: '',
            datosProducto: []
        }
    }

    async componentDidMount (){
        const token = await AsyncStorage.getItem('userToken')
		if (token === undefined || token === null) {
			console.log("no existe token")
		}
		else{
			const decoded = jwt_decode(token)
            this.setState({
                login: decoded.identity.login,
            })
            await this.setState({
                producto: this.props.navigation.state.params.producto,
                datosProducto: this.props.navigation.state.params.datosProducto
            })
            console.log(this.state.producto)
            console.log(this.state.datosProducto)
        }
    }

    async valorar() {
        if(this.state.valoracion != ''){
            console.log("antes estaValorado")
            await estaValorado(this.state.producto,this.state.valoracion).then(res => {
                console.log(res)
                if(res!="SI"){
                    console.log("antes valorarProducto")
                    console.log(this.state.producto)
                    console.log(this.state.valoracion)
                    valorarProducto(this.state.producto,this.state.valoracion)
                    Alert.alert('','Valoracion enviada con éxito',[{text: 'OK'}],{cancelable: false});
                    this.props.navigation.goBack()
                }
                else{
                    Alert.alert('','Ya has valorado este producto',[{text: 'OK'}],{cancelable: false});
                }
            })
        }
        else{
             Alert.alert('','Por favor, introduce tu valoración',[{text: 'OK'}],{cancelable: false});
        }
    }

    render(){
        return(
            <View style={styles.itemsContainer}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Text style={styles.cuerpoVerde}>Producto calificado</Text>
                    <Text style={styles.cuerpo}>{this.state.datosProducto[0]}</Text>
                    <Text style={styles.cuerpoVerde}>Calificación del producto</Text>
                    <Picker
                        selectedValue={this.state.valoracion}
                        onPress={() => Keyboard.dismiss()}
                        onValueChange={(itemValue, itemIndex) => this.setState({valoracion: itemValue})}>
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                      <Picker.Item label="4" value="4" />
                      <Picker.Item label="5" value="5" />
                    </Picker>
                    <TouchableOpacity style={styles.button} onPress={() => this.valorar()}>
                        <Text style={styles.buttonText}>Enviar calificacion</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    cuerpo: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 20,
        overflow: 'hidden',
        textAlign: 'center'
    },
    itemsContainer : {
        flexGrow: 1,
        margin: 15,
    },
    button: {
        flex:1,
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 17,
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    redbutton: {
        flex:1,
        width:300,
        backgroundColor:'#cb3234',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 17,
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize:20,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
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
    inputBoxText: {
        height: 200,
        width:345,
        backgroundColor: '#F5FCFF',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:20,
        color:'black',
        marginVertical: 10,
        alignItems: 'flex-start',
        textAlign: 'left'
    }
});

export default Reportar;
