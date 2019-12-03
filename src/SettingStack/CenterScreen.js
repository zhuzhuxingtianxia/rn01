import React, { Component } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

export default class Classes extends Component {
  static navigationOptions = ({ navigation }) =>{
    return {
      header: null,  //隐藏顶部导航栏
    }  
  };
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.bigBlue}>个人中心界面</Text>
        <Button
          title="Go to Setting"
          onPress={() => this.props.navigation.navigate('Setting')}
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
