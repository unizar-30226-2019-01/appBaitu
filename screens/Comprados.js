import React, {Component} from 'react';
import {TouchableOpacity,Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,RefreshControl,Dimensions,Button,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo';
import { getProductosComprados } from '../controlador/GestionPublicaciones';
import { StackNavigator } from 'react-navigation';
import { infoUsuario } from '../controlador/GestionUsuarios.js'
import jwt_decode from 'jwt-decode';

const numColumns = 2;

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

class MisPublisList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			refreshingV: false,
			refreshingS: false,
			productos: [],
			estado: true,		//Venta true, subasta false
            login: ''
		};
	}

	componentWillMount(){
		this.setState({
			login: this.props.navigation.state.params.login
		})
	}

	componentDidMount() {
		this.onRefresh()
	}

	async onRefresh(){
		this.setState({refreshingV:true})
		const user = {
			login:this.state.login
		}
		await getProductosComprados(user).then(data => {
            this.setState({productos: data})
        })
		console.log(this.state.productos)
		this.setState({refreshingV:false})
	}

	renderItem = ({ item, index }) => {
		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />;
		}
		else{
			return (
				<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('CalificarProducto', {datosProducto: item})}>
					<Image
						style={styles.image}
						source={{uri: item[5]}}/>
					<Text style={styles.price}>{item[3]}</Text>
					<Text style={styles.title}>{item[0]}</Text>
				</TouchableOpacity>
			)
		}
	}

    render(){
		return(
			<LinearGradient colors={['#dddddd', '#dddddd']} style={styles.colorContainer} >
				<FlatList
					refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh.bind(this)}
					/>
					}
					data={formatData(this.state.productos, numColumns)}
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
	goBack: {
		height: 35,
		width: 35,
		marginTop: 5,
		marginLeft: 5,
		alignSelf: 'flex-start'
	}
})

export default MisPublisList;
