import React, { Component } from 'react';
import { StyleSheet, Animated,Easing, Text, View,Button} from 'react-native';

export default class MoveBackView extends Component {
  constructor(props){
    super(props);
    this.state = {
        xPosition:new Animated.Value(0)
    }
  }
  componentDidMount(){

  }
  _start() {
    Animated.timing(this.state.xPosition, {
        toValue: 100,
        easing: Easing.back(),
        duration: 1000
      }).start();
  }
  _resetAnimated() {
    this.state.xPosition.setValue(0)
  }
  render() {
    return (
      <View style={styles.root}>
        <Animated.View 
            style={{width:180,height:100,backgroundColor:'red',marginLeft:this.state.xPosition}}>
            <Text style={styles.bigBlue}>just bigBlue</Text>
        </Animated.View>
        <View style={styles.buttons}>
            <Button title='开始动画' onPress={()=>this._start()}></Button>
            <Button title='重置' onPress={()=>this._resetAnimated()}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    justifyContent:'center',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttons: {
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20,
  }
});
