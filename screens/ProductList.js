import React, {Component} from 'react';
import {TouchableOpacity,Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,RefreshControl,Dimensions,Button} from 'react-native';
import { LinearGradient } from 'expo';
import { getProductos, getSubastas, getTipoPublicacion, getPublicaciones, infoSubasta, infoVenta } from '../controlador/GestionPublicaciones';
import { StackNavigator } from 'react-navigation';

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

class ProductList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			refreshingV: false,
			refreshingS: false,
			ventas: [],
			subastas: [],
			estado: true		//Venta true, subasta false
		};
	}

	componentDidMount() {
		this.onRefreshV()
	}

	onRefreshV(){
		this.setState({refreshingV:true, estado:true})
		getProductos().then(data => {
            this.setState({ventas: data})
        })
		this.setState({refreshingV:false})
	}

	onRefreshS(){
		this.setState({refreshingS:true, estado:false})
		getSubastas().then(data => {
            this.setState({subastas: data})
		})
		this.setState({refreshingS:false})
	}

	/* precioPublicacion(id){
		var tipo = getTipoPublicacion(id)
		var precio
		if (tipo=="Venta"){
			infoVenta(id).then(data => {
				precio = data[6]
			})
			console.log(precio)
			return precio
		}
		else{
			infoSubasta(id).then(data => {
				return data[6]
			})
		}
	} */

	renderItem = ({ item, index }) => {
		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />;
		}
		if(this.state.estado){
			return (
				<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Venta', {id: item[1]})}>
					<Image
						style={styles.image}
						source={{uri: item[6]}}/>
					<Text style={styles.venta}>Venta</Text>
					<Text style={styles.price}>{item[4]}€</Text>
					<Text style={styles.title}>{item[0]}</Text>
				</TouchableOpacity>
			)
		}
		else {
			return (
				<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Subasta', {id: item[1]})}>
					<Image
						style={styles.image}
						source={{uri: item[6]}}/>
					<Text style={styles.subasta}>Subasta</Text>
					<Text style={styles.price}>{item[4]}€</Text>
					<Text style={styles.title}>{item[0]}</Text>
				</TouchableOpacity>
			)
		}
    }


    render(){
		if(this.state.estado) {
			return(
				<LinearGradient colors={['#dddddd', '#dddddd']} style={styles.colorContainer} >

					<Button onPress={this.onRefreshV.bind(this)} title="Ventas" />
					<Button onPress={this.onRefreshS.bind(this)} title="Subastas" />

				<FlatList
					refreshControl={
					<RefreshControl
						refreshing={this.state.refreshingV}
						onRefresh={this.onRefreshV.bind(this)}
					/>
					}
					data={formatData(this.state.ventas, numColumns)}
					style={styles.containerItem}
					renderItem={this.renderItem}
					numColumns={numColumns}
					keyExtractor={(item, index) => index.toString()}
				/>

				</LinearGradient>
			)
		}
		else {
			return(
				<LinearGradient colors={['#dddddd', '#dddddd']} style={styles.colorContainer} >

					<Button onPress={this.onRefreshV.bind(this)} title="Ventas" />
					<Button onPress={this.onRefreshS.bind(this)} title="Subastas" />

				<FlatList
					refreshControl={
					<RefreshControl
						refreshing={this.state.refreshingS}
						onRefresh={this.onRefreshS.bind(this)}
					/>
					}
					data={formatData(this.state.subastas, numColumns)}
					style={styles.containerItem}
					renderItem={this.renderItem}
					numColumns={numColumns}
					keyExtractor={(item, index) => index.toString()}
				/>
				</LinearGradient>
	        )
		}

    }
}


const styles = StyleSheet.create({
	horizontal: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
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
})

export default ProductList;
