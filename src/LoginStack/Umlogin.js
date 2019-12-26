import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View,  ImageBackground,
	 Image, TextInput, TouchableHighlight} from 'react-native';
import EncryptCode from './EncryptCode'
import Toast from 'react-native-root-toast';
import LoaddingIndicator from '../components/LoaddingIndicator'
import { fetchPost } from '../utils/Request'

export default class Umlogin extends Component {
	static navigationOptions = {
		header:null,
	  };
	state = { inputName: 'username',
			  inputPwd: 'password' }
	
	constructor(props){
		super(props);
	}
	componentDidMount(){
		
	}
	onChangeTextName(text){
		console.log(text)
		this.setState({
			inputName:text
		});
	}
	onChangeTextPwd(text) {
		console.log(text)
		this.setState({
			inputPwd:text
		});
	}
	onPressAction= async () =>{
		console.log('按钮点击')
		LoaddingIndicator.show(true, "登录中...");
		const pwd = EncryptCode.encrypt(this.state.inputPwd)
		var body = {username:this.state.inputName,
					password:pwd,
			}
		const url = 'http://xxx/api/login'
		let response = await fetchPost(url,body);
		LoaddingIndicator.hide();
		let responseJson = await response.json();
		console.log('pptoken:',responseJson.object.token)
		if(responseJson.object && responseJson.object.token){
			await AsyncStorage.setItem('userToken', responseJson.object.token);
			Toast.show('登录成功',{
				position: Toast.positions.CENTER,// toast位置
				duration: 1000,// toast显示时长
				onHide: () => {
					// toast隐藏回调（动画结束时）
					this.props.navigation.navigate('Tabbar');
				}
			})
			
		}else{
			alert(JSON.stringify(responseJson))
		}
	}
	_onPress= () =>{
		var message = null;
		if(this.state.inputName.length == 0){
			message = '请输入用户名'
		}else if(this.state.inputPwd.length == 0){
			message = '请输入密码'
		}

		if(message) {
		Toast.show(message,{duration:1000,position: Toast.positions.CENTER})
		 return;
		}
		LoaddingIndicator.show(true, "登录中...");
		setTimeout(()=>{
			LoaddingIndicator.hide();
			// AsyncStorage.setItem('userToken', 'abc');
			Toast.show('登陆成功', {
				position: Toast.positions.CENTER,
				duration: 1000,
				hideOnPress: true,
				onShown: () => {
					this.props.navigation.navigate('Tabbar');
				},
				onHide: () => {
	
				},
			});
		},1000)
		
	}

  render() {
    return (
		<ImageBackground source={require('../imgs/bgimg.png')} style={{width: '100%', height: '100%'}}>
			<View style={styles.root}>
				<View style={styles.content}>
					<Text style={{fontSize:20,color:'#eb5400',height:60,lineHeight:60,fontWeight:'bold'}}>登陆</Text>
					<View style={styles.div}>
						<Image source={require('../imgs/uericon.png')} style={{width: 16, height: 20}}></Image>
						<TextInput style={styles.input} placeholder='请输入账号' 
											value={this.state.inputName}
											onChangeText={text => this.onChangeTextName(text)}></TextInput>
					</View>
					<View style={styles.div}>
						<Image source={require('../imgs/pwdiocn.png')} style={{width: 16, height: 20}}></Image>
						<TextInput style={styles.input} placeholder='请输入密码' 
											value={this.state.inputPwd}
											secureTextEntry={true}
											onChangeText={text => this.onChangeTextPwd(text)}></TextInput>
					</View>
					<TouchableHighlight onPress={this._onPress} style={styles.button} underlayColor='#f0f0f0'>
						<Text style={styles.buttonText}>登陆</Text>
					</TouchableHighlight>
				</View>
			</View>
		</ImageBackground>
    );
	}

}

const styles = StyleSheet.create({
 	root: {
		flex:1,
		justifyContent:"center",
		alignItems: "center",
	},
	content: {
		backgroundColor:'#fff',
		width:'70%',
		borderRadius: 10,
		alignItems:"center"
	},
  div: {
		flexDirection:'row',
		alignItems:'center',
		width:'80%',
		marginTop:10,
		marginBottom:10,
		borderBottomWidth:1,
		borderBottomColor:'#d1d6e5',
	},
	input: {
		flex:1,
		paddingLeft:10,
		height: 35,
		padding: 0
	},
	button: {
		width:'80%',
		height:40,
		marginTop:20,
		marginBottom:30,
		borderRadius:20,
		borderWidth:1,
		borderColor:'#eb5400',
		flexDirection:'row',
		justifyContent:"center",
		alignItems:"center"
	},
	buttonText: {
		fontSize:14,
		fontWeight:'bold',
		color:'#eb5400'
	}
});
