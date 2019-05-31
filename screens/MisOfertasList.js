import React, {Component} from 'react';
import {TouchableOpacity,Alert,Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,RefreshControl,Dimensions,Button,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo';
import { listarOfertas, infoVenta, aceptarOferta, eliminarOferta, eliminarTodasOfertas  } from '../controlador/GestionPublicaciones';
import { StackNavigator } from 'react-navigation';
import { infoUsuario } from '../controlador/GestionUsuarios.js'
import jwt_decode from 'jwt-decode';

const numColumns = 1;

//Colores para subasta y venta
const subasta = 'fea041'
const venta = '8dff7f'
const widthSubasta = 70
const widthVenta = 60


const formatData = (data, numColumns) => {
	const numberOfFullRows = Math.floor(data.length / numColumns);
	let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
	while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
		data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
		numberOfElementsLastRow++;
	}
	return data;
};

class MisOfertasList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			refreshingOfertas:false,
			ofertas: [],
			datosVenta: [],
			foto: '',
			id: '',
            login: ''
		};
	}

	componentDidUpdate(){
		if (this.state.id != this.props.navigation.state.params.id){
			this.onRefreshOfertas()
		}
	}

	componentWillMount(){
		this.setState({
			login: this.props.navigation.state.params.login
		})
	}

	async componentDidMount() {
		console.log(this.props.navigation.state.params.id)
		await this.setState({
			id: this.props.navigation.state.params.id
		})
		this.onRefreshOfertas()
	}

	async onRefreshOfertas(){
		this.setState({refreshingOfertas:true})
		console.log(this.state.id)
		await listarOfertas(this.state.id).then(data => {
            this.setState({ofertas: data})
        })
		console.log(this.state.ofertas)
		await infoVenta(this.state.id).then(data => {
	    	this.setState({
	            datosVenta: data,
	            foto: data[4]
	        })
	    })
		this.setState({refreshingOfertas:false})
	}


	onRefresh(){
		this.onRefreshOfertas()
	}

	aceptarOferta(user){
  		aceptarOferta(user,this.state.id)
  		eliminarTodasOfertas(this.state.id)
		Alert.alert('','Oferta aceptada',[{text: 'OK'}],{cancelable: false});
		this.props.navigation.goBack()
	}

	rechazarOferta(user){
  		eliminarOferta(user,this.state.id)
  		this.onRefreshOfertas()
	}

	renderItem = ({ item, index }) => {
		if (item.empty === true) {
			console.log('locoo')
			return <View style={[styles.item, styles.itemInvisible]} />;
		}
		return (
			<View
				style={{
				flexDirection: 'row',
				height: 100,
				padding: 20,
				backgroundColor: '#ffffff',
				marginBottom:2,
				alignItems: 'center'
				}}>
				<Text style={styles.price}>{item[0]}€</Text>
				<Text style={styles.title}>{item[1]}</Text>
				<TouchableOpacity onPress={() => this.aceptarOferta(item[1]) }>
					<Text style={styles.aceptar}>ACEPTAR</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.rechazarOferta(item[1]) }>
					<Text style={styles.rechazar}>RECHAZAR</Text>
				</TouchableOpacity>
			</View>
		)
	}

    render(){
			return(
				<LinearGradient colors={['#dddddd', '#dddddd']} style={styles.colorContainer} >
					<View>
						<Image
							style={styles.image}
							source={{uri: this.state.foto}}/>
						<Text style={styles.venta}>Venta</Text>
						<Text style={styles.price}>{this.state.datosVenta[6]}€</Text>
						<Text style={styles.title}>{this.state.datosVenta[1]}</Text>
					</View>
					<FlatList
						refreshControl={
						<RefreshControl
							refreshing={this.state.refreshingOfertas}
							onRefresh={this.onRefreshOfertas.bind(this)}
						/>
						}
						data={formatData(this.state.ofertas, numColumns)}
						style={styles.containerItem}
						renderItem={this.renderItem}
						numColumns={numColumns}
						keyExtractor={(item, index) => index.toString()}
					/>
				</LinearGradient>
			)
	}
}


const styles = StyleSheet.create({
	horizontal: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	colorContainer : {
		flex: 1
	},
	item: {
		backgroundColor: '#ffffff',
		flex: 1,
		margin:2,
		height: 240
	},
	itemInvisible: {
		backgroundColor: 'transparent',
	},
	itemText: {
		color: '#000',
	},
	image: {
		height: 150,
		width: Dimensions.get('window').width/numColumns-4,
		alignItems: 'center',
	},
	venta: {
		fontSize: 15,
		width: 60,
		marginTop: 5,
		marginLeft: 5,
		borderWidth: 3.5,
		borderColor: '#8dff7f',
		borderRadius: 15,
		backgroundColor: '#8dff7f',
		overflow: 'hidden',
		textAlign: 'center',
		alignItems: 'flex-start',
		color: 'black'
	},
	subasta: {
		fontSize: 15,
		width: 70,
		marginTop: 5,
		marginLeft: 5,
		borderWidth: 3.5,
		borderColor: '#fea041',
		borderRadius: 15,
		backgroundColor: '#fea041',
		overflow: 'hidden',
		textAlign: 'center',
		alignItems: 'flex-start',
		color: 'black'
	},
    title: {
        fontSize: 18,
		marginLeft: 10,
    },
    price: {
        fontSize: 25,
		marginTop: 5,
		marginLeft: 10,
        fontWeight: 'bold'
    },
    botonVentaSubasta: {
        fontSize: 17,
        width: 90,
        margin: 5,
        borderWidth: 3.5,
        borderColor: '#1c313a',
        borderRadius: 15,
        backgroundColor: '#1c313a',
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white'
	},
	aceptar: {
		fontSize: 17,
		width: 110,
		margin: 10,
		borderWidth: 3.5,
		borderColor: 'green',
		borderRadius: 15,
		backgroundColor: 'green',
		overflow: 'hidden',
		textAlign: 'center',
		alignItems: 'center',
		color: 'white'
	},
	rechazar: {
		fontSize: 17,
		width: 110,
		margin: 10,
		borderWidth: 3.5,
		borderColor: 'red',
		borderRadius: 15,
		backgroundColor: 'red',
		overflow: 'hidden',
		textAlign: 'center',
		alignItems: 'center',
		color: 'white'
	},
	goBack: {
		height: 35,
		width: 35,
		marginTop: 5,
		marginLeft: 5,
		alignSelf: 'flex-start'
	}
})

export default MisOfertasList;
