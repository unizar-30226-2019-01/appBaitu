import React, {Component} from 'react';
import {Title,AsyncStorage,Text,View,Image,TextInput,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight} from 'react-native';
import { LinearGradient, ImagePicker, Permissions } from 'expo';
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
        datos: [],
        uploading: false
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
         await infoUsuario(decoded.identity.login).then(data => {
          this.setState({
              login: decoded.identity.login,
              datos: data
          })
        })
          //this.getAll(usuario)
         this.setState({
              nombre: this.state.datos[1],
              apellidos: this.state.datos[2],
              telefono: this.state.datos[7],
              foto: this.state.datos[4]
          })
      }
    }

    _pickImage = async () => {
      const {
        status: cameraRollPerm
      } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        this.setState({foto : pickerResult.uri})
        this._handleImagePicked(pickerResult);
      }
    };


    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
        try {
          this.setState({
            uploading: true
          });

          if (!pickerResult.cancelled) {
            uploadResponse = await uploadImageAsync(pickerResult.uri);
            uploadResult = await uploadResponse.json();

            this.setState({
              foto: uploadResult.location
            });
          }
        } catch (e) {
          console.log("Error en handle")
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({
            uploading: false
          });
        }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        const user = {
            login: this.state.datos[0], // No se permite cambiar
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,
            email: this.state.datos[3],   // No se permite cambiar
            telefono: this.state.telefono,
            foto: this.state.foto
        }
        actualizarInfo(user)
        this.props.navigation.navigate('DrawerStack')
    }

    render(){
        if (this.state.datos[4] === undefined || this.state.datos[4] === "") {
            fotovar= 'https://image.flaticon.com/icons/png/512/64/64572.png'
        }
        else {
            fotovar = this.state.foto
        }
        return(
          <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={100} behavior={"position"}>
                    <TouchableOpacity onPress={this._pickImage}>
                        <Image style={styles.imagenPerfil}
                            source={{uri: fotovar}}/>
                    </TouchableOpacity>
                    <Text style={styles.price}>{this.state.datos[6]}
                        <Image
                            style={styles.estrella}
                            source={require('../assets/images/estrella.png')}/>
                    </Text>
                    <Text style={styles.title}>{this.state.login}</Text>
                    <View style={styles.itemsContainer}>
                        <Text style={styles.cuerpoVerde}>Nombre</Text>
                        <TextInput style={styles.inputBox}
                            defaultValue={this.state.datos[1]}
                            clearButtonMode='while-editing'
                            editable={true}
                            onChangeText={(nombre) => this.setState({nombre})}
                            onChange={this.onChange}
                            />
                        <Text style={styles.cuerpoVerde}>Apellidos</Text>
                        <TextInput style={styles.inputBox}
                            defaultValue={this.state.datos[2]}
                            clearButtonMode='while-editing'
                            editable={true}
                            onChangeText={(apellidos) => this.setState({apellidos})}
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
                        <Text></Text>
                        <Text></Text>
                        <TouchableOpacity style={styles.button} onPress={() => {this.onSubmit()}}>
                            <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.buttonText}>DESCARTAR CAMBIOS</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
        </LinearGradient>
        </ScrollView>
        )
    }
}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
};


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
