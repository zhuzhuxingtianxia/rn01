import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { StyleSheet,Dimensions, Button,TouchableWithoutFeedback, 
        Image, View, Text, Alert } from 'react-native';
import Swiper from '../components/Swiper'

export default class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
			const { params } = navigation.state;
			console.log(JSON.stringify(params))
      return {
        title: navigation.getParam('title', '标题'),
        headerStyle: {
          backgroundColor: navigationOptions.headerTintColor,
        },
        headerTintColor: navigationOptions.headerStyle.backgroundColor,
      };
    };
    constructor(props){
      super(props);
      this.state = {
        items: [{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577355710645&di=8cd199e783b9106d2bd76bb708479823&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F35a10dbad8a0f48a.jpg'},
              {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577355710641&di=2dbf06c85821dc43aa9f0501a6700b7d&imgtype=0&src=http%3A%2F%2Fwww.hlbrdaily.com.cn%2Fuploadfile%2F201505%2F26%2F1439399393.jpg'},
              {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577355782571&di=f3de3349197b4757982ca71061334f4a&imgtype=0&src=http%3A%2F%2Fdl.ppt123.net%2Fpptbj%2F201603%2F2016030410335208.jpg'},
              {url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1072420261,1305026683&fm=26&gp=0.jpg'}]
      }
    }
    componentDidMount(){
      //收到监听
      this.listener = DeviceEventEmitter.addListener("EventName", (params) => {
        Alert.alert('返回值：'+ JSON.stringify(params));
      })
    }
    componentWillUnmount() {
      //移除监听
      if (this.listener) {
        this.listener.remove();
      }
    }
    render() {
      const { navigation } = this.props;
      return (
        <View style={{flex:1,alignItems:'center'}}>
          <View style={{height:200}}>
            <Swiper autoplay={true}  removeClippedSubviews={false} 
                    onIndexChanged={(index)=>{
                      console.log(index)
                    }}>
              {this.state.items.map((item, key) => {
                const {screenWidth} = Dimensions.get('window')
                return (
                  <TouchableWithoutFeedback key={key} style={{flex:1}} onPress={()=>{
                    alert(key)
                  }}>
                    <Image style={{width:screenWidth,flex:1}} 
                          source={{uri:item.url}}
                          defaultSource={require('../imgs/bifenxi.png')}/>
                  </TouchableWithoutFeedback>
                )
              })}
            </Swiper>
          </View>
					<Button
						title="修改导航标题"
						onPress={() => this.props.navigation.setParams({ title: '修改导航' })}
					/>
          <Text> {JSON.stringify(navigation.state.params)}</Text>
          <Text> {navigation.getParam('title', 'default value')}</Text>
          <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('DetailsScreen')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('HomeScreen')}
        />
        <Button title="Go back"
                onPress={() => {
                  this.props.navigation.state.params.callback('导航回调传参');
                  this.props.navigation.goBack()
                }}
        />
        <Button
          title="Go Top"
          onPress={() => this.props.navigation.popToTop()}
        />
				<Button
          title="Go Details Info"
          onPress={() => this.props.navigation.push('DetailsInfoScreen',{title:'详情信息'})}
        />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    swiper: {},
  })