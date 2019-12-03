import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Classes extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.bigBlue}>关于界面</Text>
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
