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
import ModalExample from '../SettingStack/ModalExample';
//动画系列
import AnimatedScreen from '../AnimatedDemo/AnimatedScreen';
import FadeInView from '../AnimatedDemo/FadeInView';
import MoveBackView from '../AnimatedDemo/MoveBackView';
import DraggableView from '../AnimatedDemo/DraggableView';
import PanResponderDemo from '../AnimatedDemo/PanResponderDemo';
import LayoutAnimationView from '../AnimatedDemo/LayoutAnimationView';
import PullDownScale from '../AnimatedDemo/PullDownScale';
import ScaleView from '../AnimatedDemo/ScaleView';
import TransformView from '../AnimatedDemo/TransformView';

const Screens = {AboutScreen,ModalExample,
                 AnimatedScreen,FadeInView,
                 MoveBackView,DraggableView,
                 PanResponderDemo,LayoutAnimationView,
                 PullDownScale,ScaleView,
                 TransformView}

const SettingStack = createStackNavigator({
  Center: {
    screen: CenterScreen,
  },
  Setting: SettingScreen,
  ...Screens
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