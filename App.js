import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

// import the different screens
import Loading from './components/loading'
import SignUp from './components/signup'
import Login from './components/login'
import Main from './components/main'
import Settings from './components/settings'
import { createMaterialTopTabNavigator  } from 'react-navigation';

// create our app's navigation stack
const RootStack = createMaterialTopTabNavigator ({
  Home: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="cogs" size={20} color={tintColor} />
    },
  },
},
{
  tabBarOptions: {
    style: {
      backgroundColor: '#33691e',
    },
    indicatorStyle :{
      backgroundColor: '#DCEDC8',
    },
    showIcon: true,
    showLabel: false
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}