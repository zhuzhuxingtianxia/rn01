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
import HomeScreen from '../HomeStack/HomeScreen';
import DetailsScreen from '../HomeStack/DetailsScreen';
import DetailsInfoScreen from '../HomeStack/DetailsInfoScreen';

const Components = {HomeScreen,DetailsScreen,DetailsInfoScreen}
const HomeStack = createStackNavigator({
    ...Components,
},
{
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
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
  }),
});

export default  HomeStack;
