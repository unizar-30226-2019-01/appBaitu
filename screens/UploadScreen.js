import React, {Component} from 'react';
import {Platform,Title,DatePickerAndroid,Button,Alert,Text,View,Image,TextInput,StyleSheet,KeyboardAvoidingView,Keyboard,ScrollView,TouchableOpacity,TouchableHighlight,Picker,AsyncStorage} from 'react-native';
import { LinearGradient, ImagePicker, Permissions, Location, Constants} from 'expo';
import EditProfile from './EditProfile.js';
import jwt_decode from 'jwt-decode';
import * as firebase from 'firebase';
import { anadirProducto, anadirSubasta } from '../controlador/GestionPublicaciones.js';


var exito = false;
var respuestaBD = "";

class Profile extends Component {
  constructor() {
    super()
    this.state = {
		login: '',
		nombre: '',
		fecha: '',
		categoria: '',
		descripcion: '',
		precio: '',
		vendedor: '',
		provincia: '',
		image: '',
		foto1: 'vacio',
		foto2: 'vacio',
		foto3: 'vacio',
        uploading: false,
        location: '',
        tipo: '',
        status: false,
        fechaFin: '',
        horaFin: '15:15'
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async abrirCalendario() {
       try {
         var {action, year, month, day} = await DatePickerAndroid.open({
           date: new Date()
         });
         month=month+1
         this.setState({fechaFin: day+"/"+month+"/"+year})
       } catch ({code, message}) {
         console.warn('Cannot open date picker', message);
       }
     }

  ShowHideTextComponentView(itemValue) {
      this.setState({tipo: itemValue})
      if(this.state.tipo === 'Subasta'){
        this.setState({status: false})
        console.log("lo pongo false")
      }
      else{
        this.setState({status: true})
        console.log("lo pongo true")
      }

}

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log("error calling location")
    } else {
      this._getLocationAsync();
    }
  }

	async componentDidMount() {
		var date = new Date().getDate(); //Current Date
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear(); //Current Year
		if (this.state.fecha != (date+"/"+month+"/"+year)) {
			this.setState({fecha: date+"/"+month+"/"+year});
		}
	}

	async componentDidMount() {
		const token = await AsyncStorage.getItem('userToken')
		if (token === undefined || token === null) {
			console.log("no existe token")
		}
		else{
			var date = new Date().getDate(); //Current Date
			var month = new Date().getMonth() + 1; //Current Month
			var year = new Date().getFullYear(); //Current Year
			this.setState({fecha: date+"/"+month+"/"+year});
			const decoded = jwt_decode(token)
			const usuario = {
				login: decoded.identity.login,
			}
			this.setState({
				login: decoded.identity.login,
				vendedor: decoded.identity.login
			})
		}
	}



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    Keyboard.dismiss()
    if(this.state.nombre != '' && this.state.precio != '' && this.state.descripcion != '' && this.state.imagen != '') {
      exito = true
    }
    else {
      Alert.alert('','Por favor, introduce todos los datos',[{text: 'OK'}],{cancelable: false});
    }
    if(exito) {
        console.log(this.state.status)
        if(this.state.status===false){
            console.log('Soy un articulo normal')
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
            provincia: this.state.location
          }
          console.log(newProducto)
          anadirProducto(newProducto).then(data => {this.setState({respuestaBD: data})})
          this.setState({crear: true})
          exito=false
        }
        else{
            console.log('Soy una asubasta')
            const newProducto = {
              nombre: this.state.nombre,
              fecha: this.state.fecha,
              categoria: this.state.categoria,
              descripcion: this.state.descripcion,
              precio: this.state.precio,
              vendedor: this.state.vendedor,
              foto: this.state.image,
              foto1: this.state.foto1,
              foto2: this.state.foto2,
              foto3: this.state.foto3,
              provincia: this.state.location,
              fechaLimite: this.state.fechaFin,
              horaLimite:this.state.horaFin
          }
          console.log(newProducto)
          anadirSubasta(newProducto).then(data => {this.setState({respuestaBD: data})})
          this.setState({crear: true})
          exito=false
          }
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
      this.setState({image : pickerResult.uri})
      console.log("Tiene la imagen: "+this.state.image)
      this._handleImagePicked(pickerResult);
    }
  };


  _handleImagePicked = async pickerResult => {
      let uploadResponse, uploadResult;
      console.log("Entra en handle")
      try {
        this.setState({
          uploading: true
        });

        if (!pickerResult.cancelled) {
          uploadResponse = await uploadImageAsync(pickerResult.uri);
          uploadResult = await uploadResponse.json();

          this.setState({
            image: uploadResult.location
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

  _pickImage1 = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this.setState({foto1 : pickerResult.uri})
      console.log("Tiene la imagen: "+this.state.image)
      this._handleImagePicked1(pickerResult);
    }
  };


  _handleImagePicked1 = async pickerResult => {
      let uploadResponse, uploadResult;
      console.log("Entra en handle")
      try {
        this.setState({
          uploading: true
        });

        if (!pickerResult.cancelled) {
          uploadResponse = await uploadImageAsync(pickerResult.uri);
          uploadResult = await uploadResponse.json();

          this.setState({
            foto1: uploadResult.location
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

  _pickImage2 = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this.setState({foto2 : pickerResult.uri})
      console.log("Tiene la imagen: "+this.state.image)
      this._handleImagePicked2(pickerResult);
    }
  };


  _handleImagePicked2 = async pickerResult => {
      let uploadResponse, uploadResult;
      console.log("Entra en handle")
      try {
        this.setState({
          uploading: true
        });

        if (!pickerResult.cancelled) {
          uploadResponse = await uploadImageAsync(pickerResult.uri);
          uploadResult = await uploadResponse.json();

          this.setState({
            foto2: uploadResult.location
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

  _pickImage3 = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this.setState({foto3 : pickerResult.uri})
      console.log("Tiene la imagen: "+this.state.image)
      this._handleImagePicked3(pickerResult);
    }
  };


  _handleImagePicked3 = async pickerResult => {
      let uploadResponse, uploadResult;
      console.log("Entra en handle")
      try {
        this.setState({
          uploading: true
        });

        if (!pickerResult.cancelled) {
          uploadResponse = await uploadImageAsync(pickerResult.uri);
          uploadResult = await uploadResponse.json();

          this.setState({
            foto3: uploadResult.location
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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("error location")
    }
    let location = await Location.getCurrentPositionAsync({});
    let loc = await {latitude: location.coords.latitude, longitude: location.coords.longitude};
    let city = await Location.reverseGeocodeAsync(loc)
    let aux = await city[0]
    location = await aux.city
    this.setState({ location });
  };


    render(){
      const { navigation } = this.props;
      let { image } = this.state;
      let text = 'Localizando..';
      if (this.state.image === undefined || this.state.image === "") {
        foto = 'http://geodezja-elipsa.pl/ikony/picture.png'
      }
      else {
        foto = this.state.image
      }

      if (this.state.foto1 === undefined || this.state.foto1 === "") {
        foto1 = 'http://geodezja-elipsa.pl/ikony/picture.png'
      }
      else {
        foto1 = this.state.foto1
      }

      if (this.state.foto2 === undefined || this.state.foto2 === "") {
        foto2 = 'http://geodezja-elipsa.pl/ikony/picture.png'
      }
      else {
        foto2 = this.state.foto2
      }

      if (this.state.foto3 === undefined || this.state.foto3 === "") {
        foto3 = 'http://geodezja-elipsa.pl/ikony/picture.png'
      }
      else {
        foto3 = this.state.foto3
      }

      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }
      if(this.state.crear) {
        console.log("RespuestaBD: "+this.state.respuestaBD)
        if(this.state.respuestaBD=="Error") {
          Alert.alert('','Fallo al crear',[{text: 'OK'}],{cancelable: false});
          this.setState({respuestaBD:""})
          this.setState({registrar:false})
        }
        else if(this.state.respuestaBD=="Exito") {
          Alert.alert('','Creado correctamente',[{text: 'OK'}],{cancelable: false});
          this.props.navigation.navigate('ProductList')
        }
      }
      return(
          <KeyboardAvoidingView style={{ flex: 1 }}
                keyboardVerticalOffset={100} behavior={"position"}>
        <LinearGradient colors={['#ffffff', '#eeeeee']}>
          <View style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
            <ScrollView  showsVerticalScrollIndicator={false}>
              <Button style={styles.botonSelec} onPress={this._pickImage} title="Selecciona una foto"/>
              <Image style={styles.imagenProducto} source={{uri: foto}}/>

              <Button style={styles.botonPeq} title="+Foto" onPress={this._pickImage1} />
              <Image style={styles.imagenProducto} source={{uri: foto1}}/>

              <Button style={styles.botonPeq} title="+Foto" onPress={this._pickImage2} />
              <Image style={styles.imagenProducto} source={{uri: foto2}}/>

              <Button style={styles.botonPeq} title="+Foto" onPress={this._pickImage3} />
              <Image style={styles.imagenProducto} source={{uri: foto3}}/>


              <Text style={styles.cuerpoVerde}>Tipo de publicación</Text>
              <Picker
                selectedValue={this.state.tipo}
                              style={styles.picker}
                              onPress={() => Keyboard.dismiss()}
                              onValueChange={(itemValue) => this.ShowHideTextComponentView(itemValue)}>
                            <Picker.Item label="Producto" value="Producto" />
                            <Picker.Item label="Subasta" value="Subasta" />
                        </Picker>
                        { this.state.status ? (<Text style={styles.cuerpoVerde}>Fecha finalizacion </Text>) : null }
                        { this.state.status ? (  <TouchableOpacity style={styles.button} onPress={() => this.abrirCalendario()}>
                            <Text style={styles.buttonText}>Seleccionar Fecha</Text>
                        </TouchableOpacity>) : null }
                          { this.state.status ? (<Text>Fecha de finalización: {this.state.fechaFin}</Text>) : null }


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
                        <Text style={styles.paragraph}>Ciudad: {text}</Text>
                        <Text style={styles.cuerpoVerde}>Categoría</Text>
                        <Picker
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
                        <Text></Text>
                        <Text></Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit() }>
                            <Text style={styles.buttonText}>SUBIR ARTÍCULO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.buttonText}>CANCELAR</Text>
                        </TouchableOpacity>


          </ScrollView>
          </View>
        </LinearGradient>
        </KeyboardAvoidingView>


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
    botonPeq: {
      marginRight: 50,
      margin: 20,
      borderRightWidth: 50
    },
    botonSelec: {
      color:'#B4FFAB',
      borderRadius: 25,
    },
    imagenProducto: {
        width: 350,
        height: 350,
        borderRadius: 20,
        marginVertical: 10,
        marginLeft: 10,
        marginRight: 10,
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
  },paragraph: {
    margin: 24,
    fontSize: 20,
    textAlign: 'center',
  },
})

export default Profile;
