import React, { Component } from 'react';
import { StyleSheet,Animated,Easing,BackHandler, Platform,
    TouchableWithoutFeedback, Modal, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings'
/*
参数：
position:默认right；
width:默认300，position为left或right时有效；
height:可选，position为bottom时有效。
renderContent:填充内容组件
*/

var siblingArray = [];
var siblings = null;
export default class Popup extends Component {
	//position:right/bottom/left
		static position = 'right';
    static show(options = {position:'right',width:300},renderContent=null) {
			
				if(options.position){
					this.position = options.position
				}else{
					options.position = this.position
				}
				//说明是通过Popup显示
				options.siblings = true

        if(Platform.OS != 'ios') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                return true;
            });
        }
        siblings = new RootSiblings(<PopupView {...options} visible={true}>
																				{renderContent}
																		</PopupView>)

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

			options.siblings = true

      siblings.update(<PopupView {...options} visible={true}/>)
    }
}
/*
参数：
show:是否显示
position:right/bottom/left 必需
onHide:点击隐藏函数
width:right/left时 必需
height:bottom时 有效
*/
export class PopupView extends Component {
  static propTypes= {

	};
  constructor(props){
    super(props);
    this.state = {
			  bottomHeight:0,
				width:new Animated.Value(0),
				height:new Animated.Value(0)
    };
	}
	static defaultProps = {
		width:300,
	};

  componentDidMount(){
		if(this.props.siblings){
			this._show();
		}	
	}
	componentDidUpdate() {
		if (this.props.show) {
			this._show();
		}
	}
  _show(){
		var animatedValue= this.props.position=='bottom'?this.state.height:this.state.width
    Animated.timing(animatedValue,{
					toValue: 1,
					duration: 300,
					easing: Easing.in
			}).start();

    }

    _hide(){
			var animatedValue= this.props.position=='bottom'?this.state.height:this.state.width
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease)
        }).start(({finished})=>{
            console.info("this.props.siblingManager",this.props.siblingManager)
            if(finished){
							if(this.props.siblings){
								Popup.hide()
							}else if(this.props.onHide){
								this.props.onHide();
							}else{
								Popup.hide()
							}
							
						}
						
        });
    };
  render() {
		const {position,width,height} = this.props
		var animatedValue= position=='bottom'?this.state.height:this.state.width
		const marginRight = animatedValue.interpolate({
			inputRange: [0,1],
			outputRange: [-width,0]
		 });
		 const marginLeft = animatedValue.interpolate({
			inputRange: [0,1],
			outputRange: [-width,0]
		 });
		 const marginBottom = animatedValue.interpolate({
			inputRange: [0,1],
			outputRange: [height?(-height):(-this.state.bottomHeight),0]
		 });

		 const margin = position=='left'?{marginLeft:marginLeft}:position=='right'?{marginRight:marginRight}:{marginBottom:marginBottom}
		 const size = position=='left'||position=='right'?{width:width}:height?{height:height}:null;
	 
		 let FrameComponent = Modal;
		 let frameStyle = null;
		 if(this.props.siblings){
			FrameComponent = View;
			frameStyle = [styles.root,{flexDirection:position=='left'?'row-reverse':position=='right'?'row':'column'}];
		 }
    return (
      <FrameComponent visible={this.props.show} transparent={true} style={frameStyle}>
        <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{
						this._hide();  
        }}>
            <View style={styles.opacityStyle}></View>
        </TouchableWithoutFeedback>
				<Animated.View style={[styles.content,this.props.style,margin,size]} 
											onLayout={e=> {
												let height = e.nativeEvent.layout.height;
												console.log('Animated.View.height:',height)
												if (this.state.bottomHeight < height) {
													this.setState({ bottomHeight: height })
												}
										}}>
					{this.props.renderContent?this.props.renderContent:this.props.children}
        </Animated.View>
      </FrameComponent>
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
        backgroundColor:'#fff'
    },
});
