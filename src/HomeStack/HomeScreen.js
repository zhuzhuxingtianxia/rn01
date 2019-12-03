import React from 'react';
import { StyleSheet, Button, Text, View, Image } from 'react-native';

export default class HomeScreen extends React.Component {
  state = {
    count: 0,
  };
  static navigationOptions = ({ navigation }) =>{
    return {
      title: '首页',
      headerTitle: () =><LogoTitle />,
      headerRight: () => (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="点击+1"
          color="#fff"
        />
      ),
    }  
  };
  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }
  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    const { count } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen  {count}</Text>
        <Button
          title="Go to Details"
          onPress={() => 
            this.props.navigation.navigate('DetailsScreen',
                  {title:'详情',
                  callback:(param) => {
                        alert(JSON.stringify(param));
                      }
                  })}
        />
      </View>
    );
  }
}

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../imgs/bifenxi.png')}
        style={{ flex:1, height: 44 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
