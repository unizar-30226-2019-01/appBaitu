import React, {Component} from 'react';
import {TouchableOpacity,Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,RefreshControl,Dimensions} from 'react-native';
import { LinearGradient } from 'expo';
import { listarVentasFavoritos, listarSubastasFavoritos, getTipoPublicacion } from '../controlador/GestionPublicaciones';
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

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
			isRefreshing: false,
			subastas: [],
			favoritos: [],
            login: ''
        }
	}

	componentWillMount() {
		this.setState({
			login: this.props.navigation.state.params.login
		})
	}

	componentDidMount() {
		this.onRefresh()
	}

    onRefresh(){
		this.setState({refreshing:true})
        listarSubastasFavoritos(this.state.login).then(data => {
            this.setState({
                subastas: data
            })
		})
        listarVentasFavoritos(this.state.login).then(data => {
            this.setState({
                favoritos: this.state.subastas.concat(data)
            })
        })
        this.setState({
			refreshing:false
		})
    }

	tipoPublicacion(id){
		var tipo = getTipoPublicacion(id)
		if (tipo=="Venta"){
			return <Text style={styles.venta}>Venta</Text>
		}
		else{
			return <Text style={styles.subasta}>Subasta</Text>
		}
	}

	renderItem = ({ item, index }) => {
		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />;
		}
		if(getTipoPublicacion(item[1]) == "Venta"){
			return (
				<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Venta', {id: item[1]})}>
					<Image
						style={styles.image}
						source={{uri: item[6]}}/>
					{this.tipoPublicacion(item[1])}
					<Text style={styles.price}>{item[4]}€</Text>
					<Text style={styles.title}>{item[0]}</Text>
				</TouchableOpacity>
			)
		}
		else{
			return (
				<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Subasta', {id: item[1]})}>
					<Image
						style={styles.image}
						source={{uri: item[8]}}/>
					{this.tipoPublicacion(item[1])}
					<Text style={styles.price}>{item[4]}€</Text>
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
					refreshing={this.state.isRefreshing}
					onRefresh={this.onRefresh.bind(this)}
				/>
				}
				data={formatData(this.state.favoritos, numColumns)}
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

export default Favoritos;
