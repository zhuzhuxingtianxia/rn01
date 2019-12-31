import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity,Text, View } from 'react-native';

export default class TransformView extends Component {
  constructor(props){
    super(props);
    this.state = {
        translateX:0,
        scale:1,
        rotate:'0deg',
    }
  }
  componentDidMount(){

  }
  render() {
      const transformX = [{translateX:this.state.translateX}]
      const transformScale = [{scale:this.state.scale}]
      const transformRotate = [{rotate:this.state.rotate}]
    return (
      <View style={styles.root}>
          <TouchableOpacity style={[styles.button,{transform:transformX}]} onPress={()=>{
              this.setState({
                translateX:this.state.translateX>0?0:100,
              })
          }}>
            <Text style={styles.bigBlue}>平移</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{transform:transformScale}]} onPress={()=>{
              this.setState({
                scale:this.state.scale>1?1:2,
              })
          }}>
            <Text style={styles.bigBlue}>缩放</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{transform:transformRotate}]} onPress={()=>{
              this.setState({
                rotate:this.state.rotate=='0deg'?'45deg':'0deg',
              })
          }}>
            <Text style={styles.bigBlue}>旋转</Text>
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
  },
  bigBlue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
