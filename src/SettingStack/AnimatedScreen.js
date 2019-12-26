import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AnimatedScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '动画demo',
        };
    };
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.bigBlue}>just bigBlue</Text>
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
