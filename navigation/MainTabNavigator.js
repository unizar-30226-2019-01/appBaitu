import React, {Component} from 'react';
import { Platform, View, TouchableHighlight, Text, Image, TouchableOpacity} from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ProductList from '../screens/ProductList';
import Profile from '../screens/Profile';
import ProfileAjeno from '../screens/ProfileAjeno';
import Calificar from '../screens/Calificar';
import Reportar from '../screens/Reportar';
import Upload from '../screens/UploadScreen';
import EditProfile from '../screens/EditProfile';
import Chats from '../screens/ChatsList';
import Search from '../screens/Search';
import SearchList from '../screens/SearchList';
import Venta from '../screens/Venta';
import Subasta from '../screens/Subasta';
import VentaOwner from '../screens/VentaOwner';
import SubastaOwner from '../screens/SubastaOwner';
import EditVenta from '../screens/EditVenta';
import EditSubasta from '../screens/EditSubasta';
import Favoritos from '../screens/Favoritos';
import HomeButton from '../components/HomeButton';
import NullComponent from '../components/NullComponent';
import MisPublis from '../screens/MisPublisList';
import Comprados from '../screens/Comprados';
import CalificarProducto from '../screens/CalificarProducto';

// Pantallas para la barra lateral
const DrawerScreen = createDrawerNavigator({
    Inicio: {screen: ProductList},
    Buscar: {screen: Search},
    Chats: {screen: Chats},
    "Subir producto":{screen: Upload},
    "Venta": {screen: Venta, navigationOptions: {
      drawerLabel: <NullComponent/>
	}},
    "Subasta": {screen: Subasta, navigationOptions: {
      drawerLabel: <NullComponent/>
	}},
	Favoritos: {screen: Favoritos, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    MisPublis: {screen: MisPublis, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    Comprados: {screen: Comprados, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    CalificarProducto: {screen: CalificarProducto, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    Profile: {screen: Profile, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    ProfileAjeno: {screen: ProfileAjeno, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    Calificar: {screen: Calificar, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    Reportar: {screen: Reportar, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
    SearchList: {screen: SearchList, navigationOptions: {
		drawerLabel: <NullComponent/>
	}},
}, {
    headerMode: 'none',
    drawerWidth: 300,
    drawerPosition: 'left'
});

// Barra lateral y propiedades
const HomeNavigator = createStackNavigator({
    DrawerStack: {screen: DrawerScreen},
    Profile: {screen: Profile},
    ProfileAjeno: {screen: ProfileAjeno},
    Calificar: {screen: Calificar},
    Reportar: {screen: Reportar},
    EditarPerfil: {screen: EditProfile},
    Venta: {screen: Venta},
    Subasta: {screen: Subasta},
    VentaOwner: {screen: VentaOwner},
    SubastaOwner: {screen: SubastaOwner},
    EditVenta: {screen: EditVenta},
    EditSubasta: {screen: EditSubasta},
	ProductList: {screen: ProductList},
	Favoritos: {screen: Favoritos},
	SearchList: {screen: SearchList}
}, {
  headerMode: 'float',
  defaultNavigationOptions: ({navigation}) =>   ({
      headerStyle: {
          backgroundColor:'#B4FFAB',
          textAlign: 'center'
      },
      headerTitle: <HomeButton navigation={navigation}/>,
      headerTintColor: 'black',
      headerLeft:
          <View>
              <TouchableOpacity onPress={() => {
                  navigation.toggleDrawer()
                  }}>
                  <Image
                      style={{width: 25, height: 25, marginLeft:10}}
                      source={require('../assets/images/MenuIcon.png')}
                  />
              </TouchableOpacity>
          </View>,
      headerRight:
      <View>
      <TouchableOpacity onPress={() => {
              navigation.navigate('Profile');
          }}>
              <Image
                  style={{width: 25, height: 25, marginRight:10}}
                  source={require('../assets/images/ProfileIcon.png')}
              />
          </TouchableOpacity>
      </View>,
    })
})


// Vista principal
const AppStackNavigator = createSwitchNavigator({
    Login:{screen: Login},
    Register: {screen: Register},
    Sidebar: {screen: HomeNavigator}},
    {
    // headerMode: 'screen',
    }
);


export default AppStackNavigator;
