import React, {Component} from 'react';
import {Title,Button,Alert,Text,View,Image,TextInput,StyleSheet,KeyboardAvoidingView,Keyboard,ScrollView,TouchableOpacity,TouchableHighlight,Picker} from 'react-native';
import { LinearGradient, ImagePicker, Permissions } from 'expo';
import EditProfile from './EditProfile.js';
import * as firebase from 'firebase';
import { anadirProducto, anadirSubasta } from '../controlador/GestionPublicaciones.js';


var exito = false;
var respuestaBD = "";

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      nombre: '',
      fecha: '',
      categoria: 'fsdf',
      descripcion: '',
      precio: null,
      vendedor: 'a',
      provincia: 'adf',
      image: null,
      foto1: 'vacio',
      foto2: 'vacio',
      foto3: 'vacio'
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    this.setState({fecha: date+"/"+month+"/"+year});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    Keyboard.dismiss()
    if(this.state.nombre != '' && this.state.precio != '' && this.state.descripcion != '' &&
       this.state.imagen != '') {
         exito = true
    }
    else {
      Alert.alert('','Por favor, introduce todos los datos',[{text: 'OK'}],{cancelable: false});
    }
    if(exito) {
      const newProducto = {
          nombre: this.state.nombre,
          fecha: this.state.fecha,
          categoria: this.state.categoria,
          descripcion: this.state.descripcion,
          precio: this.state.precio,
          vendedor: this.state.vendedor,
          fotoPrincipal: this.state.image,
          foto1: this.state.foto1,
          foto2: this.state.foto2,
          foto3: this.state.foto3,
          provincia: this.state.provincia
        }
      console.log(newProducto)
      anadirProducto(newProducto).then(data => {
        this.setState({
          respuestaBD: data
        })
      })
      this.setState({crear: true})
      exito=false
    }


  }


    render(){
      const { navigation } = this.props;
      let { image } = this.state;
      if(this.state.crear) {
        console.log("RespuestaBD: "+this.state.respuestaBD)
        if(this.state.respuestaBD=="Error") {
          Alert.alert('','Fallo al crear',[{text: 'OK'}],{cancelable: false});
          this.setState({respuestaBD:""})
          this.setState({registrar:false})
        }
        else if(this.state.respuestaBD=="Exito") {
          Alert.alert('','Creado correctamente',[{text: 'OK'}],{cancelable: false});
        }
      }
        return(
          <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
                    <View style={styles.itemsContainer}>
                    <Button style={styles.botonSelec} onPress={this._pickImage} title="Selecciona una foto"/>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Image style={styles.imagenProducto}
                                source={{uri: image}}/>
                        </TouchableOpacity>
                        <Text style={styles.cuerpoVerde}>Tipo de publicación</Text>
                        <Picker
                              selectedValue={this.state.category}
                              style={styles.picker}
                              onPress={() => Keyboard.dismiss()}
                              onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})
                        }>
                            <Picker.Item label="Producto" value="Producto" />
                            <Picker.Item label="Subasta" value="Subasta" />
                        </Picker>


                        <Text style={styles.cuerpoVerde}>Título</Text>
                        <TextInput style={styles.inputBox}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          placeholder="Introduce aquí tu título..."
                          placeholderTextColor = "#BCC5D5"
                      	  autoCorrect={false}
                          value={this.state.nombre}
                          onChangeText={(nombre) => this.setState({nombre})}
                        />
                        <Text style={styles.cuerpoVerde}>Precio (€)</Text>
                        <TextInput style={styles.inputBox}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          placeholder="Introduce aquí el precio..."
                          placeholderTextColor = "#BCC5D5"
                      	  autoCorrect={false}
                          keyboardType={'numeric'}
                          type="number"
                          value={this.state.precio}
                          onChangeText={(precio) => this.setState({precio})}
                        />
                        <Text style={styles.cuerpoVerde}>Descripción</Text>
                        <TextInput style={styles.inputBoxDescription}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          placeholder="Introduce aquí tu descripción..."
                          placeholderTextColor = "#BCC5D5"
                      	  autoCorrect={false}
                          value={this.state.descripcion}
                          onChangeText={(descripcion) => this.setState({descripcion})}
                        />
                        <Text></Text>
                        <Text></Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit() }>
                            <Text style={styles.buttonText}>SUBIR ARTÍCULO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>CANCELAR</Text>
                        </TouchableOpacity>
                    </View>

        </LinearGradient>
        </ScrollView>
        </KeyboardAvoidingView>
        )
    }

    _pickImage = async () => {
        const { status: cameraRollPerm } = await Permissions.askAsync(
          Permissions.CAMERA_ROLL
        );

        // only if user allows permission to camera roll
        if (cameraRollPerm === "granted") {
          let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            //mediaTypes: Images,
            aspect: [4, 3]
          });
          //this._handleImagePicked(pickerResult);
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
        }
      };

}



const styles = StyleSheet.create({
    botonSelec: {
      color:'#B4FFAB',
      borderRadius: 25,
    },
    imagenProducto: {
        width: 350,
        height: 350,
        borderRadius: 20,
        marginVertical: 10,
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
        margin: 20,
        //justifyContent:'flex-start'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
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
      width:345,
      backgroundColor: '#F5FCFF',
      borderRadius: 25,
      paddingHorizontal:16,
      fontSize:20,
      color:'black',
      marginVertical: 10
  },
  inputBoxDescription: {
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
})

export default Profile;
