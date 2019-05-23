import React, {Component} from 'react';
import {Title,AsyncStorage,Text,View,Image,TextInput,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight} from 'react-native';
import { LinearGradient } from 'expo';
import { actualizarInfo, infoUsuario } from '../controlador/GestionUsuarios';
import jwt_decode from 'jwt-decode';
import EditProfile from './EditProfile.js';



class Profile extends Component {

    constructor() {
      super()
      this.state = {
        login: '',
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        foto:'',
        datos: []
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
    }


    async componentDidMount() {
      const token = await AsyncStorage.getItem('userToken')
      if (token === undefined || token === null) {
          console.log("no existe token")
      }
      else{
          console.log("si existe token")
          const decoded = jwt_decode(token)
          const usuario = {
              login: decoded.identity.login
          }
          console.log(usuario.login)
          infoUsuario(decoded.identity.login).then(data => {
          this.setState({
              login: decoded.identity.login,
              datos: data
          },
          () => {
              console.log("devuelvo")
          })
        })
          //this.getAll(usuario)
      }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
      const user = {
        login: this.state.datos[0],
        nombre: this.state.datos[1],
        apellidos: this.state.datos[2],
        email: this.state.datos[3],
        telefono: this.state.datos[7]
      }
      console.log(user)
      actualizarInfo(user)
      console.log('Estoy actualizando cositas')
      this.props.navigation.navigate('Profile')
    }

    volverMenu(e) {
      this.props.navigation.navigate('Profile')
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Image style={styles.imagenPerfil}
                            source={{uri: foto}}/>
                    </TouchableOpacity>
                    <Text style={styles.price}>{this.state.datos[6]}
                        <Image
                            style={styles.estrella}
                            source={require('../assets/images/estrella.png')}/>
                    </Text>
                    <Text style={styles.title}>{this.state.login}</Text>
                    <Text style={styles.subtitulo}>{this.state.datos[1]} {this.state.datos[2]}</Text>
                    <View style={styles.itemsContainer}>
                        <Text style={styles.cuerpoVerde}>Correo</Text>
                        <TextInput style={styles.inputBox}
                            keyboardType="email-address"
                            defaultValue={this.state.datos[3]}
                            clearButtonMode='while-editing'
                            editable={true}
                            onChangeText={(email) => this.setState({email})}
                            onChange={this.onChange}
                            />
                        <Text style={styles.cuerpoVerde}>Teléfono</Text>
                        <TextInput style={styles.inputBox}
                            keyboardType={'numeric'}
                            defaultValue={String(this.state.datos[7])}
                            clearButtonMode='while-editing'
                            editable={true}
                            onChangeText={(telefono) => this.setState({telefono})}
                            onChange={this.onChange}
                            />
                        <Text style={styles.cuerpoVerde}>Dirección</Text>
                        <TextInput style={styles.inputBox}
                            defaultValue='Residenciale Milloneti 7, Torino'
                            clearButtonMode='while-editing'
                            editable={true}
                            />
                        <Text></Text>
                        <Text></Text>
                        <TouchableOpacity style={styles.button} onPress={() => {this.onSubmit()}}>
                            <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {this.volverMenu}}>
                            <Text style={styles.buttonText}>DESCARTAR CAMBIOS</Text>
                        </TouchableOpacity>
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
        marginTop: 10,
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
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 17,
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
    inputBox: {
        fontSize: 20,
        marginTop: 5,
        overflow: 'hidden',
        textAlign: 'left',
        paddingHorizontal: 7,
        borderColor: '#777777',
        borderWidth: 1
    }
})

export default Profile;
