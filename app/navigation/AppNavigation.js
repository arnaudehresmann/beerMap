import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigation from './MainTabNavigation';
import AuthNavigation from './AuthNavigation'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigation,
  Auth: AuthNavigation,
});