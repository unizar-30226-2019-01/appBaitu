import React, {Component} from 'react';
import {TouchableOpacity,Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,RefreshControl,Dimensions,Button} from 'react-native';
import { LinearGradient } from 'expo';
import { getTipoPublicacion, infoSubasta, infoVenta, filtrarVentas, filtrarSubastas } from '../controlador/GestionPublicaciones';
import { StackNavigator } from 'react-navigation';

const numColumns = 2;

//Colores para subasta y venta
const subasta = 'fea041'
const venta = '8dff7f'
const widthSubasta = 70
const widthVenta = 60


const formatData = (data, numColumns) => {
	//const numberOfFullRows = Math.floor(data.length / numColumns);
	//const numberOfFullRows = Math.floor(data.length / numColumns);
	//let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
	const numberOfFullRows = 5
	let numberOfElementsLastRow = 10 - (numberOfFullRows * numColumns);
	while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
		data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
		numberOfElementsLastRow++;
	}
	return data;
};

class SearchList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			category: 'Todas',
			order: 'MayorAMenor',
			price: 30,
			nombre: '',
			refreshingV: false,
			refreshingS: false,
			ventas: [],
			subastas: [],
			estado: true		//Venta true, subasta false
		};
	}

	codN(){
		if (this.state.nombre == ''){
			return "_*_"
		}
		else{
			return this.state.nombre
		}
	}

	componentDidUpdate() {
		if(this.state.nombre!=this.props.navigation.state.params.nombre ||
			this.state.category!=this.props.navigation.state.params.category ||
			this.state.order!=this.props.navigation.state.params.order ||
			this.state.price!=this.props.navigation.state.params.price){
				this.setState({
					nombre: this.props.navigation.state.params.nombre,
					category: this.props.navigation.state.params.category,
					order: this.props.navigation.state.params.order,
					price: this.props.navigation.state.params.price
				})
				this.onRefresh()
			}
	}

	componentDidMount() {
		this.setState({
			nombre: this.props.navigation.state.params.nombre,
			category: this.props.navigation.state.params.category,
			order: this.props.navigation.state.params.order,
			price: this.props.navigation.state.params.price
		})
		this.onRefresh()
	}

	onRefreshV(){
		this.setState({refreshingV:true, estado:true})
		filtrarVentas(this.state.category, this.state.order, this.state.price, codN(this.state.nombre)).then(data => {
			this.setState({ventas: data})
		})
		this.setState({refreshingV:false})
	}

	onRefreshS(){
		this.setState({refreshingS:true, estado:false})
		filtrarSubastas(this.state.category, this.state.order, this.state.price, codN(this.state.nombre)).then(data => {
            this.setState({subastas: data})
        })
		this.setState({refreshingS:false})
	}

	onRefresh(){
		console.log(this.state)
		if(this.state.estado){
			this.onRefreshV()
		}
		else{
			this.state.onRefreshS()
		}
	}

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

	botones(){
		return(
			<View style={styles.horizontal}>
				<TouchableOpacity onPress={this.onRefreshV.bind(this)}>
					<Text style={styles.botonVentaSubasta}>Ventas</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.onRefreshS.bind(this)}>
					<Text style={styles.botonVentaSubasta}>Subastas</Text>
				</TouchableOpacity>
			</View>
		)
	}

    render(){
		if(this.state.estado) {
			return(
				<LinearGradient colors={['#dddddd', '#dddddd']} style={styles.colorContainer} >
					<FlatList
						refreshControl={
						<RefreshControl
							refreshing={this.state.refreshingV}
							onRefresh={this.onRefreshV.bind(this)}
						/>
						}
						ListHeaderComponent={this.botones()}
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
					<FlatList
						refreshControl={
						<RefreshControl
							refreshing={this.state.refreshingS}
							onRefresh={this.onRefreshS.bind(this)}
						/>
						}
						ListHeaderComponent={this.botones()}
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
		justifyContent: 'center',
	},
	colorContainer : {
		flex: 1
	},
	item: {
		backgroundColor: '#ffffff',
		flex: 1,
		margin:2,
		height: 240,
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
})

export default SearchList;
