import React, {Component} from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,TouchableHighlight,Image,KeyboardAvoidingView,Picker,Keyboard,TouchableWithoutFeedback,Slider} from 'react-native';
import { LinearGradient } from 'expo';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class ProductScreen extends Component {
    constructor(){
         super();
         this.state={
           category : 'Todas',
           order:'MayorAMenor',
           price: 30,
           minPrice: 0,
           maxPrice: 1000
         }
       }

    render(){
        const { navigation } = this.props;
        return(
        <DismissKeyboard>
			<View style={styles.container}>
				<KeyboardAvoidingView behavior="padding" enabled>
					<Text style={styles.title}>¡Búsqueda!</Text>
					<TextInput style={styles.inputBox}
						underlineColorAndroid='transparent'
						underlineColorAndroid='rgba(0,0,0,0)'
						placeholder="¿Qué quieres buscar?"
						placeholderTextColor = "#BCC5D5"
						autoCapitalize={'none'}
						autoCorrect={false}
					/>
					<Text style={styles.cuerpoVerde}>Categoría</Text>
					<Picker
							selectedValue={this.state.category}
							style={styles.picker}
							onPress={() => Keyboard.dismiss()}
							onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})
					}>
						<Picker.Item label="Todas" value="Todas" />
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
						<Picker.Item label="Libros" value="Libros" />
						<Picker.Item label="Niños" value="Niños" />
						<Picker.Item label="Empleo" value="Empleo" />
						<Picker.Item label="Construcción" value="Construcción" />
						<Picker.Item label="Coleccionismo" value="Coleccionismo" />
						<Picker.Item label="Otros" value="Otros" />
					</Picker>
					<Text style={styles.cuerpoVerde}>Ordenar de...</Text>
					<Picker
						selectedValue={this.state.order}
						style={styles.picker}
						onPress={() => Keyboard.dismiss()}
						onValueChange={(itemValue2, itemIndex2) => this.setState({order: itemValue2})
					}>
						<Picker.Item label="Mayor a menor" value="MayorAMenor" />
						<Picker.Item label="Menor a mayor" value="MenorAMayor" />
					</Picker>
					<Text style={styles.cuerpoVerde}>Precio máximo</Text>
					<Slider
						style={{ width: 320}}
						step={1}
						minimumValue={this.state.minPrice}
						maximumValue={this.state.maxPrice}
						value={this.state.price}
						onValueChange={val => this.setState({ price: val })}
						thumbTintColor='rgb(252, 228, 149)'
						maximumTrackTintColor='#d3d3d3'
						minimumTrackTintColor='rgb(252, 228, 149)'
					/>
					<View style={styles.textCon}>
						<Text>{this.state.minPrice} €</Text>
						<Text>{this.state.price + '€'}</Text>
						<Text>{this.state.maxPrice} €</Text>
					</View>
					<Text></Text>
					<Text></Text>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
						<Text style={styles.buttonText}>Buscar</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
        </DismissKeyboard>
        )
    }
}


const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

  inputBox: {
    width:300,
    backgroundColor: '#F5FCFF',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:20,
    color:'black',
    marginVertical: 10
  },
  button: {
    width:320,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  link: {

  },cuerpoVerde: {
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
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'white',
    textAlign:'center'
    },
  picker: {
      width:320,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#1c313a',
      overflow: 'hidden'
  }
});

export default ProductScreen;
