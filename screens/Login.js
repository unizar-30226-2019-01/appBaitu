import React, {Component} from 'react';
import {StyleSheet,AsyncStorage,Text,Alert,View,TextInput,TouchableOpacity,TouchableWithoutFeedback,TouchableHighlight,Image,Keyboard,KeyboardAvoidingView,BackHandler} from 'react-native';
import { LinearGradient } from 'expo';
import { StackNavigator} from 'react-navigation';
import { login } from '../controlador/GestionUsuarios.js'


import Register from './Register.js';
//import Sidebar from '../components/Sidebar.js';

var exito = false;
var respuestaBD = "";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
   BackHandler.addEventListener('hardwareBackPress', this.backPress)

 }

 componentWillUnmount() {
   BackHandler.removeEventListener('hardwareBackPress', this.backPress)
 }

 backPress = () => {
     if (this.props.navigation.isFocused()) {
    Alert.alert(
    "Cerrar aplicacion",
    "¿Seguro que quieres salir?",
    [
      {
        text: "No"
      },
      { text: "Si", onPress: () => BackHandler.exitApp() }
    ],
    { cancelable: false }
    );
    return true;
}
 }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    Keyboard.dismiss()
    if(this.state.login != '' && this.state.password != '') {
      exito = true
		}
    else {
      Alert.alert('','Por favor, introduce todos los datos',[{text: 'OK'}],{cancelable: false});
    }
    if(exito) {
      const user = {
        login: this.state.login,
        password: this.state.password
      }
      login(user).then(data => {
        this.setState({
          respuestaBD: data
        })
      })
      this.setState({logear: true})
      exito = false
    }
  }

    render(){
        const { navigation } = this.props;
        if(this.state.logear) {
          if(this.state.respuestaBD=="Error") {
            Alert.alert('','Login o contraseña incorrectos',[{text: 'OK'}],{cancelable: false});
            this.setState({respuestaBD:""})
            this.setState({logear: false})
          }
          else if(this.state.respuestaBD != undefined){
            AsyncStorage.setItem('userToken', this.state.respuestaBD)
            this.props.navigation.navigate('Sidebar')
          }
        }
        return(
        <LinearGradient colors={['#B4FFAB', '#12FFF7']} style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
         <Image source={require('../assets/images/logo_nobg.png')} />
         <Text style={styles.title}>¡Bienvenido!</Text>
          <TextInput style={styles.inputBox}
              underlineColorAndroid='transparent'
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Usuario"
              placeholderTextColor = "#BCC5D5"
              keyboardType="email-address"
              value={this.state.login}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(login) => this.setState({login})}
              />
          <TextInput style={styles.inputBox}
              underlineColorAndroid='transparent'
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
               <TouchableOpacity style={styles.button} onPress={ () => this.onSubmit() }>
             <Text style={styles.buttonText}>Entrar</Text>
           </TouchableOpacity>
            </KeyboardAvoidingView>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')}>
             <Text style={styles.link}>Crear cuenta</Text>
             </TouchableHighlight>
  		</LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  inputBox: {
    width:300,
    backgroundColor: '#F5FCFF',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:25,
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
  link: {
    textAlignVertical: 'bottom',
    fontSize: 20,
    marginBottom: 40
  },
  buttonText: {
    fontSize:20,
    fontWeight:'500',
    color:'white',
    textAlign:'center'
}
});

export default Login;
