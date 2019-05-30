import React, {Component} from 'react';
import {Button,Title,Picker, TimePickerAndroid, DatePickerAndroid,Dimensions,TextInput,Alert,BackHandler,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,TouchableHighlight,AsyncStorage} from 'react-native';
import { LinearGradient, ImagePicker, Permissions, Location, Constants } from 'expo';
import jwt_decode from 'jwt-decode';
import { deleteUser, infoUsuario } from '../controlador/GestionUsuarios';
import { getFotos, infoVenta, actualizarProducto } from '../controlador/GestionPublicaciones';

var respuestaBD = "";

class EditVenta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosProducto: [],
            login: '',
			id: '',
            descripcion: '',
            nombre: '',
            categoria: '',
            fecha: '',
            fotoP: 'vacio',
            foto1: 'vacio',
            foto2: 'vacio',
            foto3: 'vacio',
            fotoPAntigua: 'vacio',
            foto1Antigua: 'vacio',
            foto2Antigua: 'vacio',
            foto3Antigua: 'vacio',
            uploading: false,
            status: false,
            fotos: [],
            precio: ''
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
        this.setState({fotoP : pickerResult.uri})
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
              fotoP: uploadResult.location
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


    async editarPublicacion(){
        console.log(this.state.categoria)
        if (this.state.categoria === '' || this.state.precio === ''){
            Alert.alert('','Por favor, selecciona la categoría y/o el precio',[{text: 'OK'}],{cancelable: false});

        }
        else {
            const producto = {
                id : this.state.id,
                nombre: this.state.nombre,
                descripcion: this.state.descripcion,
                categoria: this.state.categoria,
                fotoP: this.state.fotoP,
                foto1: this.state.foto1,
                foto2: this.state.foto2,
                foto3: this.state.foto3,
                fotoPAntigua: this.state.fotoPAntigua,
                foto1Antigua: this.state.foto1Antigua,
                foto2Antigua: this.state.foto2Antigua,
                foto3Antigua: this.state.foto3Antigua,
                fecha: this.state.fecha,
                precio: this.state.precio
            }
            console.log(this.state.producto)
            await actualizarProducto(producto).then(data => {
                this.setState({respuestaBD: data})
                console.log(data)
            })
            if(this.state.respuestaBD === "Exito") {
                Alert.alert('','Cambios realizados con exito',[{text: 'OK'}],{cancelable: false});
                this.props.navigation.goBack()
            }
            else {
                Alert.alert('','Error al actualizar',[{text: 'OK'}],{cancelable: false});
            }

        }

    }

    async componentDidUpdate(){
        if (this.state.id != this.props.navigation.state.params.id){
            var date = new Date().getDate(); //Current Date
    		var month = new Date().getMonth() + 1; //Current Month
    		var year = new Date().getFullYear(); //Current Year
    		if (this.state.fecha != (date+"/"+month+"/"+year)) {
    			this.setState({fecha: date+"/"+month+"/"+year});
    		}

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

                //Obtener datos del producto en subasta
                await infoVenta(this.state.id).then(data => {
                    this.setState({
                        login: decoded.identity.login,
                        datosProducto: data
                    })
                })
                //asignar variables del producto en subasta
                this.setState({nombre: this.state.datosProducto[1]})
                this.setState({descripcion: this.state.datosProducto[2]})
                this.setState({fotoP: this.state.datosProducto[4]})


                await getFotos(this.state.id).then(data => {
                    this.setState({
                        fotos: data
                    })
                })

                let aux=[]
                if (this.state.fotos.length == 1) {
                    aux=this.state.fotos[0]
                    this.setState({foto1: aux[0]})
                    this.setState({foto1Antigua: aux[0]})
                    console.log(this.state.foto1)
                }
                if (this.state.fotos.length == 2) {
                    aux=this.state.fotos[0]
                    this.setState({foto1: aux[0]})
                    this.setState({foto1Antigua: aux[0]})
                    console.log(this.state.foto1)

                    aux=this.state.fotos[1]
                    this.setState({foto2: aux[0]})
                    this.setState({foto2Antigua: aux[0]})
                    console.log(this.state.foto2)
                }
                if (this.state.fotos.length == 3) {
                    aux=this.state.fotos[0]
                    this.setState({foto1: aux[0]})
                    this.setState({foto1Antigua: aux[0]})
                    console.log(this.state.foto1)

                    aux=this.state.fotos[1]
                    this.setState({foto2: aux[0]})
                    this.setState({foto2Antigua: aux[0]})
                    console.log(this.state.foto2)

                    aux=this.state.fotos[2]
                    this.setState({foto3: aux[0]})
                    this.setState({foto3Antigua: aux[0]})
                    console.log(this.state.foto3)
                }
            }
        }
    }

    async componentDidMount() {
        var date = new Date().getDate(); //Current Date
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear(); //Current Year
		if (this.state.fecha != (date+"/"+month+"/"+year)) {
			this.setState({fecha: date+"/"+month+"/"+year});
		}

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

            //Obtener datos del producto en subasta
            await infoVenta(this.state.id).then(data => {
                this.setState({
                    login: decoded.identity.login,
                    datosProducto: data
                })
            })
            //asignar variables del producto en subasta
            this.setState({nombre: this.state.datosProducto[1]})
            this.setState({descripcion: this.state.datosProducto[2]})
            this.setState({fotoP: this.state.datosProducto[4]})


            await getFotos(this.state.id).then(data => {
                this.setState({
                    fotos: data
                })
            })
            console.log("devuelveeeee")
            console.log(this.state.fotos.length)
            console.log(this.state.fotos)
            let aux=[]
            if (this.state.fotos.length == 1) {
                aux=this.state.fotos[0]
                this.setState({foto1: aux[0]})
                this.setState({foto1Antigua: aux[0]})
                console.log(this.state.foto1)
            }
            if (this.state.fotos.length == 2) {
                aux=this.state.fotos[0]
                this.setState({foto1: aux[0]})
                this.setState({foto1Antigua: aux[0]})
                console.log(this.state.foto1)
                aux=this.state.fotos[1]
                this.setState({foto2: aux[0]})
                this.setState({foto2Antigua: aux[0]})
                console.log(this.state.foto2)
            }
            if (this.state.fotos.length == 3) {
                aux=this.state.fotos[0]
                this.setState({foto1: aux[0]})
                this.setState({foto1Antigua: aux[0]})
                console.log(this.state.foto1)
                aux=this.state.fotos[1]
                this.setState({foto2: aux[0]})
                this.setState({foto2Antigua: aux[0]})
                console.log(this.state.foto2)
                aux=this.state.fotos[2]
                this.setState({foto3: aux[0]})
                this.setState({foto3Antigua: aux[0]})
                console.log(this.state.foto3)
            }
            //
            // console.log(this.state.login)
            // console.log(this.state.id)
            // console.log(this.state.descripcion)
            // console.log(this.state.nombre)
            // console.log(this.state.categoria)
            // console.log(this.state.fecha)
            // console.log(this.state.fotoP)
            // console.log(this.state.foto1)
            // console.log(this.state.foto2)
            // console.log(this.state.foto3)
            // console.log(this.state.fotoPAntigua)
            // console.log(this.state.foto1Antigua)
            // console.log(this.state.foto2Antigua)
            // console.log(this.state.foto3Antigua)
        }
	}


    render(){
        return(
            <ScrollView>
            <LinearGradient colors={['#ffffff', '#eeeeee']}>
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={100} behavior={"position"}>
                  <Button style={styles.botonSelec} onPress={this._pickImage} title="Selecciona una foto"/>
                  <Image style={styles.image} source={{uri: this.state.fotoP}}/>

                  <Button style={styles.botonPeq} title="+Foto" onPress={this._pickImage1} />
                  <Image style={styles.image} source={{uri: this.state.foto1}}/>

                  <Button style={styles.botonPeq} title="+Foto" onPress={this._pickImage2} />
                  <Image style={styles.image} source={{uri: this.state.foto2}}/>

                  <Button style={styles.botonPeq} title="+Foto" onPress={this._pickImage3} />
                   <Image style={styles.image} source={{uri: this.state.foto3}}/>

					<View style={styles.horizontal}>
                    	<Text style={styles.venta}>Venta</Text>
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
                        <Text style={styles.cuerpoVerde}>Precio (€)</Text>
						<TextInput style={styles.inputBox}
							
							clearButtonMode='while-editing'
							autoCorrect={false}
							keyboardType={'decimal-pad'}
                            onChangeText={(precio) => this.setState({precio})}
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
    image: {
        flex: 1,
        backgroundColor: 'gray',
        height: (Dimensions.get('window').width),
		alignItems: 'center',
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
    venta: {
        fontSize: 17,
        width: 65,
        marginTop: 5,
        marginLeft: 10,
        borderWidth: 3.5,
        borderColor: '#8dff7f',
        borderRadius: 15,
        backgroundColor: '#8dff7f',
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

export default EditVenta;
