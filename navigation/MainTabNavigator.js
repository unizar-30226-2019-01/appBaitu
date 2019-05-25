import React, {Component} from 'react';
import { Platform, View, TouchableHighlight, Text, Image, TouchableOpacity} from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ProductList from '../screens/ProductList';
import Profile from '../screens/Profile';
import Upload from '../screens/UploadScreen';
import EditProfile from '../screens/EditProfile';
import Chats from '../screens/ChatsList';
import Search from '../screens/Search';
import Venta from '../screens/Venta';
import Favoritos from '../screens/Favoritos';
import HomeButton from '../components/HomeButton';
import NullComponent from '../components/NullComponent';

// Pantallas para la barra lateral
const DrawerScreen = createDrawerNavigator({
    Inicio: {screen: ProductList},
    Buscar: {screen: Search},
    Chats: {screen: Chats},
    "Subir producto":{screen: Upload},
    "Venta": {screen: Venta, navigationOptions: {
      drawerLabel: <NullComponent/>
	}},
	Favoritos: {screen: Favoritos, navigationOptions: {
		drawerLabel: <NullComponent/>
	}}
}, {
    headerMode: 'none',
    drawerWidth: 300,
    drawerPosition: 'left'
});

// Barra lateral y propiedades
const HomeNavigator = createStackNavigator({
    DrawerStack: {screen: DrawerScreen},
    Profile: {screen: Profile},
    EditarPerfil: {screen: EditProfile},
    Venta: {screen: Venta},
	ProductList: {screen: ProductList},
	Favoritos: {screen: Favoritos}
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
