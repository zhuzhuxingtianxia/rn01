import React, { Component } from 'react';
import { StyleSheet,FlatList, TouchableOpacity,Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Popup,{PopupView} from '../components/Popup'

export default class Classes extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    console.log(JSON.stringify(params))
    const number = navigation.getParam('number')
    const headerLeft = number>0?{headerLeft:navigation.getParam('headerLeft')}:null;
    return {
      title: navigation.getParam('title', '商品列表'),
      headerTitle:navigation.getParam('headerTitle'),
      headerRight:navigation.getParam('headerRight'),
      ...headerLeft
    };
    
  };
  _headerTitle=()=> {
    const number = this.props.navigation.getParam('number')
    return (
      <View>
        <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>
         {number>0?`选中${number}个`:'商品列表'}
        </Text>
      </View>
    )
  }
  _headerLeft=()=> {
    return (
      <TouchableOpacity style={{marginLeft:15}} onPress={()=>{
        var noneSelectItems = this.state.datas.map((item)=>{
          item.select = false
          return item;
        })
        this.props.navigation.setParams({ number: 0 });
        this.setState({
          selectItems:[],
          datas:noneSelectItems
        })
      }}>
        <Text style={{fontSize:15,color:'#fff'}}>取消</Text>
      </TouchableOpacity>
    )
    
  }
  _headerRight=()=> {
    const number = this.props.navigation.getParam('number')
    return (
      <TouchableOpacity style={{marginRight:15}} onPress={()=>{
        if(number>0){
          var selectItems = this.state.datas.map((item)=>{
            item.select = true
          })
          this.props.navigation.setParams({ number: selectItems.length });
          this.setState({
            selectItems:selectItems,
          })
        }else{
          Popup.show();
        }
      }}>
        {number>0?<Text style={{fontSize:15,color:'#fff'}}>全选</Text>
          :<Image source={require('../imgs/tabbar/property.png')} style={{tintColor:'#fff',width:30,height:30}}/>}
      </TouchableOpacity>
    )
  };
  constructor(props){
    super(props);
    this.state = {
      selectItems:[],
      datas:[{name:'商品分类1',classId:'001'},
             {name:'商品分类2',classId:'002'},
             {name:'商品分类3',classId:'003'},
             {name:'商品分类4',classId:'004'},
             {name:'商品分类5',classId:'005'},
             {name:'商品分类6',classId:'006'}],
    }
  }
  componentDidMount(){
    this.props.navigation.setParams({ headerTitle: this._headerTitle });
    this.props.navigation.setParams({ headerLeft: this._headerLeft });
    this.props.navigation.setParams({ headerRight: this._headerRight });
    this.props.navigation.setParams({ number: this.state.selectItems.length });
  }
  _onPressItem=(index)=> {
    var item = this.state.datas[index]
    if(item.select){
      item.select = false
    }else{
      item.select = true
    }

    var selectItems = this.state.datas.filter((item)=>{
        if(item.select){
          return item
        }
    })
    this.props.navigation.setParams({ number: selectItems.length });
    this.setState({
      selectItems:selectItems,
    })

  }
  render() {
    return (
      <View style={styles.root}>
        <View style={{height:40,paddingLeft:10,justifyContent:'center',backgroundColor:'#f0f0f0'}}>
          <Text>总计有 {this.state.datas.length} 个分类</Text>
        </View>
        <FlatList style={styles.root} 
                  data={this.state.datas} 
                  extraData={this.state}
                  keyExtractor={(item, index) => 'item'+index}
                  renderItem={this._renderItem}></FlatList>
        {this.state.selectItems.length>0?
          <View style={{margin:20,alignItems:'center'}}>
            <TouchableOpacity style={styles.bottomBtn} onPress={()=>{
              this.props.navigation.state.params.callback(this.state.selectItems);
              this.props.navigation.goBack();
            }}>
              <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#eb5400', '#fcbb47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={{fontSize:18,color:'#fff'}}>确定</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          :null}
      </View>
    );
  }

  _renderItem = ({item, index, separators})=> {
    return <ListItem item={item} index={index} 
                    onPressItem={this._onPressItem}/>
  }
}

class ListItem extends React.Component {

  _onPress(index) {
    this.props.onPressItem(index);
  }
  render() {
    const {item,index} = this.props
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onPress(index)}>
        <View style={styles.cellContent}>
          <Text>{item.name}</Text>
          <View style={item.select?styles.selectmark:styles.mark}></View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  cellContent: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:50,
    marginLeft:10,
    borderBottomColor:'#f0f0f0',
    borderBottomWidth:0.5,
  },
  mark: {
    height:16,
    width:16,
    borderRadius:8,
    borderColor:'#f4511e',
    borderWidth:1,
    marginRight:20,
  },
  selectmark: {
    height:16,
    width:16,
    borderRadius:8,
    backgroundColor:'#f4511e',
    marginRight:20,
  },
  bottomBtn: {
    height:50,
    width:'90%',
    borderRadius:25,
    overflow:'hidden',
    justifyContent:'center'
  }
});
