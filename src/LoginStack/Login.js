import React from 'react';
import { StyleSheet,
				 Text,
				 View, 
				 ImageBackground, 
				 Image, 
				 TextInput,
				 TouchableHighlight} from 'react-native';
function onPressAction() {
	console.log('按钮点击了')
}
export default function Classes() {
	const [inputName, onChangeTextName] = React.useState('xiwen001');
	const [inputPwd, onChangeTextPwd] = React.useState('3gynj20J003');
	// const [btnText, onPressAction] = React.useState('登陆');
	
	return (
		<ImageBackground source={require('./imgs/bgimg.png')} style={{width: '100%', height: '100%'}}>
			<View style={styles.root}>
				<View style={styles.content}>
					<Text style={{fontSize:20,color:'#eb5400',height:60,lineHeight:60,fontWeight:'bold'}}>登陆</Text>
					<View style={styles.div}>
						<Image source={require('./imgs/uericon.png')} style={{width: 16, height: 20}}></Image>
						<TextInput style={styles.input} placeholder='请输入账号' 
											value={inputName}
											onChangeText={text => onChangeTextName(text)}></TextInput>
					</View>
					<View style={styles.div}>
						<Image source={require('./imgs/pwdiocn.png')} style={{width: 16, height: 20}}></Image>
						<TextInput style={styles.input} placeholder='请输入密码' 
											value={inputPwd}
											secureTextEntry={true}
											onChangeText={text => onChangeTextPwd(text)}></TextInput>
					</View>
					<TouchableHighlight onPress={()=>onPressAction()} style={styles.button} underlayColor='#f0f0f0'>
						<Text style={styles.buttonText}>登陆</Text>
					</TouchableHighlight>
				</View>
			</View>
		</ImageBackground>
	);

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
