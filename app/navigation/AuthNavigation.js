import React from 'react';
import {  createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login'
import SignUp from '../screens/Signup'
import LoadingScreen from '../screens/Loading'

export default AuthNavigation = createSwitchNavigator({
    Loading: LoadingScreen,
    Login: LoginScreen,
    SignUp: SignUp
  });