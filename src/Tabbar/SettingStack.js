/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator } from 'react-navigation-stack';
import CenterScreen from '../SettingStack/CenterScreen';
import SettingScreen from '../SettingStack/SettingScreen';
import AboutScreen from '../SettingStack/AboutScreen';

const SettingStack = createStackNavigator({
  Center: {
    screen: CenterScreen,
  },
  Setting: SettingScreen,
  About: AboutScreen,
},
{
  initialRouteName: 'Center',
  defaultNavigationOptions: {
    headerStyle: {
    backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:18,
    },
    headerBackTitle: null,
  },
});
//设置隐藏底部tabbar组件
SettingStack.navigationOptions = ({ navigation }) => {
  return {
      tabBarVisible: navigation.state.index === 0,
  };
};
export default SettingStack;