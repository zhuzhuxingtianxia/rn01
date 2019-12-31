import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Platform,
  Dimensions,
  findNodeHandle
} from 'react-native';

const NavHeight = 0;
const ScreenWidth = Dimensions.get('window').width;

class PullDownScale extends React.Component {

  static navigationOptions = {
    header: null //隐藏导航栏
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0), //初始化动画效果
      isRefresh: false, //下拉刷新动画判断
      imgHeight:255,
      viewRef:null,
      dataSource: [
        { name: "aaa", num: 16835 }
        , { name: "ccc", num: 16752 }
        , { name: "ddd", num: 62587 }
        , { name: "eee", num: 882 }
        , { name: "fff", num: 12068 }
      ] //初始化Flatlist数据
    }
  }

  //添加动画效果
  _renderHeaderParallaxImage=()=> {
    const { scrollY } = this.state

    let translateY
    if (Platform.OS == 'ios') {
      translateY = scrollY.interpolate({
        inputRange: [this.state.imgHeight - 64 + 50, this.state.imgHeight + (64 - 50), this.state.imgHeight + (64 - 50)],
        outputRange: [this.state.imgHeight, this.state.imgHeight - 30, this.state.imgHeight - 30],
      })
    } else {
      translateY = scrollY.interpolate({
        inputRange: [this.state.imgHeight - 44 + 30 + 20, this.state.imgHeight - 30 + 44 + 20, this.state.imgHeight - 30 + 44 + 20],
        outputRange: [this.state.imgHeight, this.state.imgHeight - 30, this.state.imgHeight - 30],
      })
    }
    //返回动画效果
    return (
      <Animated.View style={{
        top: 0,
        width: ScreenWidth,
        height: this.state.imgHeight,
        position: 'absolute',
        backgroundColor: '#ff0033'
      }}>
        <Animated.Image
          onLoad={() => this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})} // for android blur
          ref='backgroundImage'
          pointerEvents='none'
          style={[{
            height: this.state.imgHeight,
            width: ScreenWidth,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [-this.state.imgHeight, 0, this.state.imgHeight - NavHeight, this.state.imgHeight],
                outputRange: [this.state.imgHeight / 2, 0, -(this.state.imgHeight - NavHeight), -(this.state.imgHeight - NavHeight)],
              })
            }, {
              scale: scrollY.interpolate({
                inputRange: [-this.state.imgHeight, 0, this.state.imgHeight],
                outputRange: [2, 1, 1], // -this.state.imgHeight: 2, 0: 1, this.state.imgHeight: 1  当scrollY在-this.state.imgHeight到0时，scale按照2-1的动画运动；当scrollY在0-this.state.imgHeight时，scale不变。可以输入任意数量对应的值，但必须是递增或者相等
              })
            }]
          }]}
          source={require('../imgs/bgimg.png')}
        >
        </Animated.Image>
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={
        styles.container
      } >
        {this._renderHeaderParallaxImage()}
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item,index) => 'item'+index}
          style={{flex:1, backgroundColor: 'transparent',marginBottom:80 }}
          ListHeaderComponent={
            //配置Flatlist的HeaderView
            <View style={{ height: this.state.imgHeight }} />
          }
          
          onScroll={
            //滚动的时候，触发动画效果
            Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])
          }
          onRefresh={() => {

              if (!this.state.isRefresh) {
                this.state.setState = {
                  isRefresh: true
                }
              }

            }
          }
          refreshing={this.state.isRefresh}
          renderItem={({ item }) => (
            <View style={{height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1',justifyContent:'center'}}>
              <Text style={{marginLeft:20}}> {item.name}</Text>
            </View>
          )}>
        </FlatList>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default PullDownScale;

