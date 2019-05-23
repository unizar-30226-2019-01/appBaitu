import React, {Component} from 'react';
import {Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,RefreshControl,Dimensions} from 'react-native';
import { LinearGradient } from 'expo';

const numColumns = 2;
//Colores para subasta y venta
const subasta = 'fea041'
const venta = '8dff7f'
const widthSubasta = 70
const widthVenta = 60

//Informacion/data
const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];

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
			isRefreshing: false,
			data: [],
			products: []
		};
	}

	onRefresh(){
		this.setState({refreshing:true})
		//funcion de llamada cargar datos de nuevo
		this.setState({refreshing:false})
	}

	renderItem = ({ item, index }) => {
		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />;
		}
		return (
			<View style={styles.item}>
				<Image
					style={styles.image}
					source={require('../assets/images/bichardo.png')}/>
				<Text style={styles.tipoPublicacion}>Venta</Text>
				<Text style={styles.price}>300€</Text>
				<Text style={styles.title}>ipad 3</Text>
				<Text style={styles.itemText}>{item.key}</Text>
			</View>
		);
    };


    render(){
        return(
			<LinearGradient colors={['#cccccc', '#cccccc']} style={styles.colorContainer} >
			<FlatList
				refreshControl={
				<RefreshControl
					refreshing={this.state.isRefreshing}
					onRefresh={this.onRefresh.bind(this)}
				/>
				}
				data={formatData(data, numColumns)}
				style={styles.containerItem}
				renderItem={this.renderItem}
				numColumns={numColumns}

			/>
			</LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
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
	tipoPublicacion: {
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
