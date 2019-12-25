import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Dimensions, Animated, ScrollView, TouchableWithoutFeedback,
       Text, View,TouchableHighlight,TouchableOpacity } from 'react-native';

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
  _onPress(tag) {
    var routeName = 'AboutScreen'
    switch (tag) {
      case 1:
        routeName = 'AboutScreen'
        break;
      case 2:
        routeName = 'AboutScreen'
        break;
      case 3:
        routeName = 'AboutScreen'
        break;
      case 4:
        routeName = 'AboutScreen'
        break;
    
      default:
        break;
    }
    this.props.navigation.navigate(routeName)

  };
  _onScroll=(event)=> {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    console.log(contentOffsetY);
    //下拉放大效果：https://www.jianshu.com/p/1c960ad75020
  }
  render() {
    return (
      <ScrollView style={styles.root} 
                  contentContainerStyle={styles.contentContainer} 
                  scrollEventThrottle={100}
                  onScroll={this._onScroll}>
        <Animated.Image style={styles.headerImg} source={require('../imgs/bgimg.png')}/>
        <View style={styles.content}>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onPress(1)}>
            <View style={styles.item}>
              <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#3f54da', '#778efd']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>About界面</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>this._onPress(2)}>
            <View style={styles.item}>
              <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#30c08f', '#69fa8e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>租赁界面</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableHighlight onPress={()=>this._onPress(3)}>
            <View style={styles.item}>
              <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#eb5400', '#fcbb47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>投资界面</Text>
              </LinearGradient>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#f0f0f0' onPress={()=>this._onPress(4)}>
            <View style={styles.item}>
              <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#fcb92f', '#fddd57']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>物业界面</Text>
              </LinearGradient>
            </View>
          </TouchableHighlight>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Setting')}>
            <View style={{height:100,flex:1,borderRadius:10,margin:5,overflow:'hidden'}}>
              <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#eb5400', '#fcbb47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>设置界面</Text>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  contentContainer: {
    paddingVertical: 0,
    flex:1,
  },
  headerImg: {
    height:300,
    resizeMode:'stretch',
  },
  content: {
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    padding:5,
  },
  item: {
    height:100,
    width:(Dimensions.get('window').width-35)/2,
    borderRadius:10,
    margin:5,
    overflow:'hidden'
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
