import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity,Text, Animated,View } from 'react-native';

export default class ScaleView extends Component {
  constructor(props){
    super(props);
    this.state = {
        scaleValue: new Animated.Value(1),
    };
    this.scaleAnimated = Animated.timing(this.state.scaleValue,{
        toValue: 2.0,
        duration: 300
    })
  }
  componentDidMount(){

  }
  _startAnimated() {
    this.state.scaleValue.setValue(1.0);
    this.scaleAnimated.start();
  }
  _resetAnimated() {
    this.state.scaleValue.setValue(2.0);
    Animated.timing(this.state.scaleValue,{
        toValue: 1.0,
        duration: 300
    }).start();
  }
  render() {
    const scale = {transform:[{scale:this.state.scaleValue}]}
    return (
      <View style={styles.root}>
          <Animated.View style={[styles.button,scale]}>
            <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',}} onPress={()=>{
                this._startAnimated()
            }}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:18}}>点击放大</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={{height:60,width:100,justifyContent:'center',alignItems:'center',backgroundColor:'red'}} onPress={()=>{
                this._resetAnimated()
            }}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:18}}>点击缩小</Text>
            </TouchableOpacity>
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
  button: {
    width:100,
    height:100,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:50,
  }
});
