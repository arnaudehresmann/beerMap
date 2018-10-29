import React from 'react';
import {  createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login'
import SignUp from '../screens/Signup'

export default AuthNavigation = createSwitchNavigator({
    Login: LoginScreen,
    SignUp: SignUp
  });