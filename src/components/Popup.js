import React, { Component } from 'react';
import { StyleSheet,Animated,Easing,BackHandler, Platform,
    TouchableWithoutFeedback, Text, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings'

var siblings = null;
export default class Popup extends Component {
		static position = 'bottom';
    static show(options = {position:'right',width:300}) {
			
			if(options.position){
				this.position = options.position
			}
        if(Platform.OS != 'ios') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                return true;
            });
        }
        siblings = new RootSiblings(<PopupView {...options} visible={true}/>)

        return siblings;
    }
    static hide() {
        if (siblings != null && siblings instanceof RootSiblings){
            if(Platform.OS != 'ios') {
                this.backHandler.remove();
            }

            siblings.destroy();
            siblings = null;
        }
    }
    static update(options) {
			if(options && !options.position){
				options.position = this.position
			}else if(!options) {
				options = {position:this.position}
			}
			
        siblings.update(<PopupView {...options} visible={true}/>)
    }
}

export class PopupView extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        width:new Animated.Value(0)
    };
  }
  componentDidMount(){
		this._show();
  }
  _show(){
    Animated.timing(this.state.width,{
					toValue: 1,
					duration: 300,
					easing: Easing.in
			}).start();

    }

    _hide(){
        Animated.timing(this.state.width, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease)
        }).start(({finished})=>{
            console.info("this.props.siblingManager",this.props.siblingManager)
            if(finished){
							Popup.hide()
						}
						
        });
    };
  render() {
		const {position,width,height} = this.props

		const marginRight = this.state.width.interpolate({
			inputRange: [0,1],
			outputRange: [-width,0]
	 });
	 
    return (
      <View style={[styles.root,{flexDirection:position=='left'?'row-reverse':position=='right'?'row':'column'}]}>
        <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{
            this._hide();
        }}>
            <View style={styles.opacityStyle}></View>
        </TouchableWithoutFeedback>
				<Animated.View style={[styles.content,
															{marginRight:marginRight},
															position=='left'||position=='right'?{width:width}:height?{height:height}:null]}>
            <Text style={{width:100,height:100,backgroundColor:'red'}}>看看</Text>
          {/* {this.props.children} */}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    root: {
        position:'absolute',
        right:0,
        bottom:0,
        left:0,
        top:0,
    },
    opacityStyle: {
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    content: {
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'#fff'
    },
});
