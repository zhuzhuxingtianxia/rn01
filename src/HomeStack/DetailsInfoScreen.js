import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class Classes extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', '标题'),
        };
    };

  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  _navgationPop = ()=> {
    DeviceEventEmitter.emit('EventName',{id:'xxxx'});
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Button
          title="返回上个界面并发送通知传值"
          onPress={this._navgationPop}
        />
      </View>
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
