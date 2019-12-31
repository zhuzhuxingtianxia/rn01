import React from 'react';
import {Animated,View,Text,PanResponder } from 'react-native';

class DraggableView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pan: new Animated.ValueXY(), // inits to zero
      };
      this.state.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {
          dx: this.state.pan.x, // x,y are Animated.Value
          dy: this.state.pan.y,
        }]),
        onPanResponderRelease: () => {
          Animated.spring(          //spring弹簧效果，拖动结束后反弹到原来位置.
            this.state.pan,         // Auto-multiplexed
            {toValue: {x: 0, y: 0}} // Back to zero
          ).start();
        },
      });
    }
    render() {
      return (
        <Animated.View
          {...this.state.panResponder.panHandlers}
          {...this.props.style}
          style={this.state.pan.getLayout()}>
          {this.props.children}
        </Animated.View>
      );
    }
  }
 
  export default () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <DraggableView style={{width: 160, height: 160, backgroundColor: 'red',justifyContent:'center',borderRadius:80,}}>
          <Text style={{fontSize: 28,color:'#fff', textAlign: 'center', margin: 10}}>DraggableView</Text>
        </DraggableView>
      </View>
    )
  }
  