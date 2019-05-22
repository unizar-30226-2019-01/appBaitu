import React from 'react';
import { Platform, View, TouchableHighlight, Text, Image, TouchableOpacity} from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ProductList from '../screens/ProductList';
import Profile from '../screens/Profile';
import HomeButton from '../components/HomeButton';



// Pantallas para la barra lateral
const DrawerScreen = createDrawerNavigator({
    Inicio: {screen: ProductList},
    Perfil: {screen: Profile}
}, {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    headerMode: 'none',
    drawerWidth: 300,
    drawerPosition: 'left'
});

// Barra lateral y propiedades
const HomeNavigator = createStackNavigator({
    DrawerStack: {screen: DrawerScreen},
    Profile: {screen: Profile}
}, {
  headerMode: 'float',
  defaultNavigationOptions: ({navigation, login}) =>   ({
      headerStyle: {
          backgroundColor:'#B4FFAB',
          paddingLeft: 10,
          paddingRight: 10,
          textAlign: 'center',
      },
      headerTitle: <HomeButton navigation={navigation}/>,
      headerTintColor: 'black',
      headerLeft:
          <View>
              <TouchableOpacity onPress={() => {
                  if(navigation.state.index === 0){
                      navigation.navigate('DrawerOpen');
                  }
                  else{
                      navigation.navigate('DrawerClose');
                  }
                  }}>
                  <Image
                      style={{width: 25, height: 25}}
                      source={require('../assets/images/MenuIcon.png')}
                  />
              </TouchableOpacity>
          </View>,
      headerRight:
      <View>
      <TouchableOpacity onPress={() => {
          if(navigation.state.index === 0){
              navigation.navigate('Profile', {login: login});
          }
          }}>
              <Image
                  style={{width: 25, height: 25}}
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


class Navigator extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <AppStackNavigator login = {
      this.props.login
    }
    />;

  }


}


export default Navigator;
