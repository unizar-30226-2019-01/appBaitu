import React, {Component} from 'react';
import {Text,View,Alert,TextInput,StyleSheet,LinearGradient,KeyboardAvoidingView,AsyncStorage,TouchableOpacity} from 'react-native';
import {reportar, infoUsuario} from '../controlador/GestionUsuarios'
import jwt_decode from 'jwt-decode';


class Reportar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vendedor: '',
            producto: '',
            texto: '',
            login: '',
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount (){
        await this.setState({
            vendedor: this.props.navigation.state.params.reportedUser,
            producto: this.props.navigation.state.params.producto
        })
        console.log(this.state.vendedor)
        console.log(this.state.producto)
        const token = await AsyncStorage.getItem('userToken')
		if (token === undefined || token === null) {
			console.log("no existe token")
		}
		else{
			const decoded = jwt_decode(token)
			const usuario = {
				login: decoded.identity.login
			}
			await infoUsuario(decoded.identity.login).then(data => {
    			this.setState({
    				login: decoded.identity.login,
    				datos: data
    			}
			)
		})
	}
    }

    async onSubmit() {
        const infoReport = {
          denunciante: this.state.login,
          vendedor: this.state.vendedor,
          producto: this.state.producto,
          texto: this.state.texto
        }
        console.log(infoReport)
        if(this.state.texto != ''){
            await reportar(infoReport).then(res => {
              this.setState({
                respuestaBD: res
              })
            })
            console.log(this.state.respuestaBD)
            if(this.state.respuestaBD === "Reportado"){
                Alert.alert('','Reporte enviado con éxito',[{text: 'OK'}],{cancelable: false});
                this.props.navigation.goBack()
            }
            else{
                Alert.alert('','No se ha podido enviar el reporte',[{text: 'OK'}],{cancelable: false});
            }
        }
        else{
             Alert.alert('','Por favor, introduce el motivo de la denuncia',[{text: 'OK'}],{cancelable: false});
        }
    }

    render(){
        return(
            <View>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Text style={styles.cuerpoVerde}>Usuario denunciado</Text>
                    <Text style={styles.cuerpo}>{this.state.vendedor}</Text>
                    <Text style={styles.cuerpoVerde}>Motivo de la denuncia</Text>
                    <TextInput style={styles.inputBoxText}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="Introduce aquí tus motivos..."
                      placeholderTextColor = "#BCC5D5"
                      autoCorrect={false}
                      value={this.state.texto}
                      onChangeText={(texto) => this.setState({texto})}
                    />
                    <TouchableOpacity style={styles.redbutton} onPress={() => {
                       Alert.alert(
                       "Enviar reporte",
                       "¿Seguro que quiere enviar el reporte?. Demasiados reportes falsos podrían llevar a la eliminación de su cuenta",
                       [
                         {
                           text: "No"
                         },
                         { text: "Si", onPress: () =>{this.onSubmit()} }
                       ],
                       { cancelable: false }
                       );
                       return true;
                   }}>
                        <Text style={styles.buttonText}>ENVIAR REPORTE</Text>
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
