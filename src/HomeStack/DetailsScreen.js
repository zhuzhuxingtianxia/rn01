import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { Button, View, Text, Alert } from 'react-native';

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Button
						title="修改导航标题"
						onPress={() => this.props.navigation.setParams({ title: '修改导航' })}
					/>
          <Text>Details Screen</Text>
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
  