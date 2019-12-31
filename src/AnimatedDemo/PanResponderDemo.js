import React, { Component } from 'react';
import { StyleSheet, PanResponder, View, Text } from 'react-native';

export default class PanResponderDemo extends Component {
    _previousLeft = 20;
    _previousTop = 84;
    circle = null;
    
  constructor(props){
    super(props);
    this.state = {
        left: 20,
        top: 84,
        pressed: false,
    }
  }
  componentDidMount(){

  }
  _handleStartShouldSetPanResponder = (evt, gestureState) => {
    // Should we become active when the user presses down on the circle?
    return true;
  };
  _handleMoveShouldSetPanResponder = (evt, gestureState) => {
    // Should we become active when the user moves a touch over the circle?
    return true;
  };
  _handlePanResponderGrant = (evt, gestureState) => {
    this.setState({
      pressed: true,
    });
  };
  _handlePanResponderMove = (event, gestureState) => {
    this.setState({
      left: this._previousLeft + gestureState.dx,
      top: this._previousTop + gestureState.dy,
    });
    console.log('Left:'+this.state.left+'\nTop:'+this.state.top)
  };
  _handlePanResponderEnd = (event, gestureState) => {
    this.setState({
      pressed: false,
    });
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    console.log('End Left:'+this._previousLeft+'\nTop:'+this._previousTop)
  };
  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderGrant,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
  });
  render() {
    return (
        <View style={styles.root}>
            <View
            ref={circle => {
              this.circle = circle;
            }}
            style={[styles.circle,
              {
                translateX: this.state.left,
                translateY: this.state.top,
                backgroundColor: this.state.pressed ? 'blue' : 'green',
              },
            ]}
            {...this._panResponder.panHandlers}
          >
            <Text style={{color:'#fff'}}>{'Left:'+this.state.left+'\nTop:'+this.state.top}</Text>
          </View>
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
  circle: {
    width: 80,
    height: 80,
    backgroundColor: 'green',
    borderRadius: 40,
    position: 'absolute',
    left: 100,
    top: 0,
    justifyContent:'center',
    alignItems:'center'
  },
});
