import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class AnimatedScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '动画demo',
        };
    };
  constructor(props){
    super(props);
    this.state = {
        data:[{route:'FadeInView',info:'淡入动画效果'},
             {route:'MoveBackView',info:'移动并反弹效果'},
             {route:'DraggableView',info:'手势滑动动画'},
             {route:'PanResponderDemo',info:'手势事件'},
             {route:'LayoutAnimationView',info:'layout放大效果'},
             {route:'PullDownScale',info:'下拉放大效果'},
             {route:'ScaleView',info:'点击放大效果'},
             {route:'TransformView',info:'transform变换'},],
    }
  }
  componentDidMount(){

  }
  _didSelectItem(item) {
    let routeName = item.route 
    this.props.navigation.navigate(routeName)
  }
  render() {
    return (
      <FlatList style={styles.root} 
                data={this.state.data} 
                extraData={this.state}
                keyExtractor={(item,index) => 'item'+index} 
                renderItem={({item, index, separators})=>{
                    return (
                        <TouchableWithoutFeedback 
                            onPress={()=>this._didSelectItem(item)}>
                            <View style={styles.content}>
                                <View>
                                    <Text style={{fontSize:15}}>{item.route}</Text>
                                    <Text style={{fontSize:12}}>{item.info}</Text>
                                </View>
                                <Image source={require('../imgs/more.png')}/>
                            </View>
                        </TouchableWithoutFeedback>
                    ) 
                }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  content: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:10,
    paddingRight:20,
    height:50,
    borderBottomColor:'#f0f0f0',
    borderBottomWidth:1,
  },
});
