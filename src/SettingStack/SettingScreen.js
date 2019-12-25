import React, { Component } from 'react';
import {name as rnName,version as rnVersion} from '../../package.json';
import AsyncStorage from '@react-native-community/async-storage';
import RNDeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Platform, DeviceInfo, Dimensions,NativeModules, 
        ScrollView, Text, View, Image, TouchableHighlight } from 'react-native';

export default class Classes extends Component {
  static navigationOptions = ({ navigation }) =>{
    return {
      title:'设置',
    }  
  };
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(JSON.stringify(process.env))
  }
  onLoginOut= async ()=>{
    try {
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('Auth');
    } catch (error) {
      
    }
  }
  /**
 * 识别开发环境是否是debug开发环境
 */
  developmentEnvironment() {
    const { scriptURL } = NativeModules.SourceCode
    const devEvn = scriptURL.split('&')[1]
    return devEvn === 'dev=true'
  };
  render() {
    const {reactNativeVersion} = Platform.constants
    const {width,height,scale} = Dimensions.get('window')
    const {isIPhoneX_deprecated} = DeviceInfo
    return (
      <View style={styles.root}>
        <ScrollView style={styles.root}>
          <View style={styles.header}>
            <Image style={{width:80,height:80,borderRadius:5,backgroundColor:'#f4511e'}}/>
            <Text style={{padding:5}}>appName:{RNDeviceInfo.getApplicationName()} v{RNDeviceInfo.getVersion()}</Text>
            <Text>rnName:{rnName} v{rnVersion}</Text>
          </View>
          <View style={styles.cell}>
            <Text>OS</Text>
            <Text>{Platform.OS}</Text>
          </View>
          <View style={styles.cell}>
            <Text>Version</Text>
            <Text>{Platform.Version}</Text>
          </View>
          <View style={styles.cell}>
            <Text>isIPhoneX</Text>
            <Text>{isIPhoneX_deprecated?"true":'false'}</Text>
          </View>
          <View style={styles.cell}>
            <Text>isPad</Text>
            <Text>{Platform.isPad?"true":'false'}</Text>
          </View>
          <View style={styles.cell}>
            <Text>width</Text>
            <Text>{width}</Text>
          </View>
          <View style={styles.cell}>
            <Text>height</Text>
            <Text>{height}</Text>
          </View>
          <View style={styles.cell}>
            <Text>scale</Text>
            <Text>{scale}</Text>
          </View>
          <View style={styles.cell}>
            <Text>DEV</Text>
            <Text>{__DEV__?'true':'false'}</Text>
          </View>
          <View style={styles.cell}>
            <Text>reactNativeVersion</Text>
            <Text>{reactNativeVersion.major}.{reactNativeVersion.minor}.{reactNativeVersion.patch}</Text>
          </View>
          <View style={styles.cell}>
            <Text>interfaceIdiom</Text>
            <Text>{Platform.constants.interfaceIdiom}</Text>
          </View>
          <View style={styles.cell}>
            <Text>systemName</Text>
            <Text>{Platform.constants.systemName}</Text>
          </View>
          <View style={styles.cell}>
            <Text>osVersion</Text>
            <Text>{Platform.constants.osVersion}</Text>
          </View>
          <View style={styles.cell}>
            <Text>developmentEnvironment</Text>
            <Text>{this.developmentEnvironment()?'dev=true':'dev=false'}</Text>
          </View>
          <View style={styles.cell}>
            <Text>scriptURL</Text>
            <Text>{NativeModules.SourceCode.scriptURL}</Text>
          </View>
          <View style={styles.cell}>
            <Text>NODE_ENV</Text>
            <Text>{process.env.NODE_ENV}</Text>
          </View>
          <View style={styles.cell}>
            <Text>env自定义环境变量</Text>
            <Text>{process.env.env}</Text>
          </View>
        </ScrollView>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <TouchableHighlight onPress={this.onLoginOut} style={styles.button} underlayColor='#f0f0f0'>
            <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#eb5400','#fcbb47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.buttonText}>退出登陆</Text>
            </LinearGradient>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  header: {
    height:180,
    justifyContent:'center',
    alignItems:'center',
  },
  cell: {
    height:50,
    marginLeft:10,
    borderTopWidth:0.5,
    borderTopColor:'#999',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:10,
    paddingRight:20,
  },
  button: {
		width:'80%',
		height:50,
		marginTop:20,
		marginBottom:30,
		borderRadius:25,
		overflow:'hidden'
	},
	buttonText: {
		fontSize:14,
		fontWeight:'bold',
		color:'#fff',
	}
});
