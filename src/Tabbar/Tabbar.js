/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeStack from './HomeStack';
import SettingStack from './SettingStack';

export default createBottomTabNavigator({
  Home: {
    screen:HomeStack,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (
          <IconWithBadge
              tintColor={tintColor}
              focused={focused}
              badgeCount={2}
              sourceImg={require('../imgs/tabbar/home.png')}
              name='首页'
          />
      ),

    },
  },
  Settings: {
    screen:SettingStack,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (
          <IconWithBadge
              tintColor={tintColor}
              focused={focused}
              sourceImg={focused?require('../imgs/tabbar/mine_press.png'):require('../imgs/tabbar/mine.png')}
              name='我的'
          />
      ),

    },
  },
},
{
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};
class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, tintColor, sourceImg } = this.props;
    return (
      <View style={{ width: 24, height: 44 }}>
        <TabBarItem name={name} sourceImg={sourceImg} tintColor={tintColor}/>
        {badgeCount > 0 && (
          <View
            style={{
              // If you're using react-native < 0.57 overflow outside of parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              left: 20,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 10,
              width: badgeCount>=100?30:badgeCount>=10?25:20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
class TabBarItem extends React.Component {
  render() {
    const { name, tintColor, sourceImg } = this.props;
      return (
          <View style={{height:47,alignItems:'center',justifyContent:'center',marginTop:2}}>
              <Image resizeMode='contain'
                  source={sourceImg}
                  style={{tintColor: tintColor,width:24,height:24,}}
              />
              <Text style={{textAlign:'center',color: tintColor,marginTop:4,marginBottom:2,fontSize:10}}>{name}</Text>
          </View>
        
      )
  }

}