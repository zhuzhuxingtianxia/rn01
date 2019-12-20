process.env.env = 'stg'

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './src/LoginStack/AuthLoadingScreen';
import Tabbar from './src/Tabbar/Tabbar';
import AuthStack from './src/Tabbar/AuthStack';

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Tabbar: Tabbar,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
export default createAppContainer(SwitchNavigator);

