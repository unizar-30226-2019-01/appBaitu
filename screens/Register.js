import React, {Component} from 'react';
import { StyleSheet,Text, AsyncStorage, View,Keyboard,TextInput,TouchableWithoutFeedback,TouchableOpacity,TouchableHighlight,ScrollView,KeyboardAvoidingView,Alert} from 'react-native';
import { LinearGradient } from 'expo';
import { StackNavigator} from 'react-navigation';
import { register} from '../controlador/GestionUsuarios';

import Login from './Login.js';

var exito = false;
var respuestaBD = "";

class Register extends Component {
	constructor() {
    super()
    this.state = {
      login: '',
      password: '',
      nombre: '',
      apellidos: '',
      email: '',
	  	telefono: '',
	  	foto: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    Keyboard.dismiss()
		if(this.state.login != '' && this.state.password != '' && this.state.Nombre != '' &&
			 this.state.apellidos != '' && this.state.email != '' ) {
			exito = true
		}
		else {
			Alert.alert('','Por favor, introduce todos los datos',[{text: 'OK'}],{cancelable: false});
		}
		if(exito) {
	    const newUser = {
	      login: this.state.login,
	      password: this.state.password,
	      nombre: this.state.nombre,
	      apellidos: this.state.apellidos,
	      telefono: this.state.telefono,
	      email: this.state.email,
		  	foto: this.state.foto
	    }
      register(newUser).then(data => {
        this.setState({
          respuestaBD: data
        })
      })
			this.setState({registrar: true});
      exito = false
		}
  }


       render(){
        const { navigation } = this.props;
        if(this.state.registrar) {
			if(this.state.respuestaBD=="error") {
				Alert.alert('','El nombre de login ya esta en uso',[{text: 'OK'}],{cancelable: false});
				this.setState({respuestaBD:""})
				this.setState({registrar:false})
			}
			else if(this.state.respuestaBD != undefined){
				AsyncStorage.setItem('userToken', this.state.respuestaBD)
				this.props.navigation.navigate('Sidebar')
			}
        }
        return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <LinearGradient colors={['#B4FFAB', '#12FFF7']} style={styles.container}>
        	<Text style={styles.title}>¡EMPIEZA A COMPRAR Y VENDER!</Text>
        	<Text style={styles.title2}>Introduce tus datos</Text>
          	<TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Usuario"
              placeholderTextColor = "#BCC5D5"
          	  autoCorrect={false}
              value={this.state.login}
              onChangeText={(login) => this.setState({login})}
              onSubmitEditing={()=> this.password.focus()}
              />
          	<TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Contraseña"
              secureTextEntry={true}
              placeholderTextColor = "#BCC5D5"
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              ref={(input) => this.password = input}
              />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Nombre"
              value={this.state.nombre}
         	  autoCorrect={false}
              onChangeText={(nombre) => this.setState({nombre})}
              placeholderTextColor = "#BCC5D5"
              />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Apellidos"
              placeholderTextColor = "#BCC5D5"
          	  autoCorrect={false}
              value={this.state.apellidos}
              onChangeText={(apellidos) => this.setState({apellidos})}
              />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Correo Electrónico"
              placeholderTextColor = "#BCC5D5"
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              />
          	<TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText}
                onPress={ () => this.onSubmit() }
             >Registrar</Text>
           </TouchableOpacity>
           <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.link}>Iniciar sesion</Text>
            </TouchableHighlight>
  		</LinearGradient>
  		</KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
	containerScroll: {
		flex: 1,
   		backgroundColor: "#fff"
	},
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  title: {
  	top: '0%',
  	fontSize: 40,
  	textAlign: 'center',
  	fontWeight: 'bold'
  },
  title2: {
  	fontSize: 20,
  	textAlign: 'center'
  },
  inputBox: {
    width:300,
    backgroundColor: '#F5FCFF',
    borderRadius: 25,
    paddingHorizontal:20,
    fontSize:23,
    color:'black',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'white',
    textAlign:'center'
},
link: {
  textAlignVertical: 'bottom',
  fontSize: 20,
  marginBottom: 40
},
});

export default Register;
