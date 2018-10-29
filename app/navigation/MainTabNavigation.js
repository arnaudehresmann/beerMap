import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/Main';
import SettingsScreen from '../screens/Settings';
import commonStyles from '../styles/Common'

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
  }
  },
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
      backgroundColor: commonStyles.darkPrimaryColor,
    },
    indicatorStyle :{
      backgroundColor: commonStyles.dividerColor,
    },
    showIcon: true,
    showLabel: false
  }
});
