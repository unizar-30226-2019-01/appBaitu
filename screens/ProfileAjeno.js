import React, {Component} from 'react';
import {Title,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,RefreshControl,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo';
import { infoUsuario } from '../controlador/GestionUsuarios.js'
import EditarPerfil from './EditProfile.js';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            login: '',
            producto: ''
        }
    }

	async componentDidMount() {
        await this.setState({
            login: this.props.navigation.state.params.login,
            producto: this.props.navigation.state.params.producto
        })
		infoUsuario(this.state.login).then(data => {
        	this.setState({
        		datos: data
        	})
	   })
   }
    onRefresh(){
        this.setState({refreshing:true})
        //funcion de llamada cargar datos de nuevo
        getProductos().then(data => {
            this.setState({
                products: data
            })
        })
        this.setState({refreshing:false})
    }

    render(){
      if (this.state.datos[4] === undefined || this.state.datos[4] === "") {
        foto= 'https://image.flaticon.com/icons/png/512/64/64572.png'
      }
      else {
        foto = this.state.datos[4]
      }
        return(
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Image
                        style={styles.imagenPerfil}
                        source={{uri: foto}}/>
                    <Text style={styles.price}>{this.state.datos[6]}
                        <Image
                            style={styles.estrella}
                            source={require('../assets/images/estrella.png')}/>
                    </Text>
                    <Text style={styles.title}>{this.state.login}</Text>
                    <Text style={styles.subtitulo}>{this.state.datos[1]} {this.state.datos[2]}</Text>
                    <View style={styles.itemsContainer}>
                        <Text style={styles.cuerpoVerde}>Correo</Text>
                        <Text style={styles.correo}>{this.state.datos[3]}</Text>
                        <Text style={styles.cuerpoVerde}>Teléfono</Text>
                        <Text style={styles.cuerpo}>{this.state.datos[7]}</Text>
                        <TouchableOpacity style={styles.redbutton} onPress={() => this.props.navigation.navigate('Reportar', {reportedUser: this.state.login, producto: this.state.producto})}>
                            <Text style={styles.buttonText}>REPORTAR USUARIO</Text>
                        </TouchableOpacity>
                        <Text></Text>
                        <Text></Text>
                    </View>
                </KeyboardAvoidingView>
      	  </LinearGradient>
          </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    imagenPerfil: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    price: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    estrella: {
        width: 20,
        height: 20
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
    buttonText: {
        fontSize:20,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
    },
    itemsContainer : {
        flexGrow: 1,
        margin: 15,
        //justifyContent:'flex-start'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitulo: {
        fontSize: 20,
        textAlign: 'center'
    },
    correo: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'left',
        fontStyle: 'italic'
    },
    cuerpo: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 20,
        overflow: 'hidden',
        textAlign: 'left'
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
    editar: {
        fontSize: 17,
        width: 70,
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 3.5,
        borderColor: '#1c313a',
        borderRadius: 15,
        backgroundColor: '#1c313a',
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white'
	},
})

export default Profile;
