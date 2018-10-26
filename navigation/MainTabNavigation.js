import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../components/main';
import LoginScreen from '../components/login'
import SettingsScreen from '../components/settings';

const AuthStack = createSwitchNavigator({
  Login: LoginScreen,
});

const HomeStack = createSwitchNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />,
};

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: null,
    }
  },
  Login: LoginScreen,
  },
  {
    initialRouteName : 'Settings',
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor }) => <Icon name="cogs" size={20} color={tintColor} />,
};



export default createMaterialTopTabNavigator({
  HomeStack,
  SettingsStack,
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
