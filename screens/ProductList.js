import React, {Component} from 'react';
import {Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,RefreshControl,Dimensions} from 'react-native';
import { LinearGradient } from 'expo';

const numColumns = 1;

//Informacion/data
const data = [
	{ key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }
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
			isRefreshing : false,
			data : [],
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
				<Text style={styles.itemText}>{item.key}</Text>
			</View>
		);
    };


    render(){
        return(
			<LinearGradient colors={['#ffffff', '#eeeeee']} style={styles.colorContainer} >
			<FlatList>
				refreshControl={
					<RefreshControl>
						refreshing={this.state.isRefreshing}
						onRefresh={this.onRefresh.bind(this)}
					</RefreshControl>
				}
				data={formatData(data, numColumns)}
				style={styles.container}
				renderItem={this.renderItem}
				numColumns={numColumns}
			</FlatList>
			</LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
	colorContainer : {
		flex: 1
	},
	item: {
		backgroundColor: '#1c313a',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 50,
		height: Dimensions.get('window').width / numColumns,
	},
	itemInvisible: {
		backgroundColor: 'transparent',
	},
	itemText: {
		color: '#fff',
	},
})

export default ProductList;
