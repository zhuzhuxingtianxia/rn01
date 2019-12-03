/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/HomeStack/HomeScreen';
import DetailsScreen from './src/HomeStack/DetailsScreen';
import DetailsInfoScreen from './src/HomeStack/DetailsInfoScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: DetailsScreen,
  DetailsInfo: DetailsInfoScreen,
},
{
  initialRouteName: 'Home',
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
    // headerBackImage:(tintColor)=>(
    //   <Image source={require('./src/imgs/goback.png')}/>
    // ),
  },
});

const AppContainer = createAppContainer(HomeStack);
/*
//1.直接export default
export default AppContainer;
*/

//2.export default class
export default class App extends React.Component {
  render() {
    return <AppContainer onNavigationStateChange={this._onNavigationStateChange}
                          ref={nav => {this.navigator = nav;}}/>;
  }
  _onNavigationStateChange(prevState, newState, action){
    // console.log('prevState:',prevState)
    // console.log('newState:',newState)
    // console.log('action:',action)
  }
  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }
}
