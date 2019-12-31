import React from 'react';
import { StyleSheet, FlatList, Button,TouchableOpacity, 
        Text, View, Image } from 'react-native';
import { fetchGet } from '../utils/Request'
import LinearGradient from 'react-native-linear-gradient';
import LoaddingIndicator from '../components/LoaddingIndicator'
import Toast from 'react-native-root-toast';
import HomeCell from './HomeCell'

const REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class HomeScreen extends React.Component {
  state = {
    count: 0,
    refreshing:false,
    emtyText:'',
    flatlistHeight:0,
    datas:[{"id":"11494",
            "title":"Chain Reaction",
            "year":1996,
            "mpaa_rating":"PG-13",
            "runtime":106,
            "release_dates":{
              "theater":"1996-08-02",
              "dvd":"2001-05-22"},
            "ratings":{
              "critics_rating":"Rotten",
              "critics_score":16,
              "audience_rating":"Spilled",
              "audience_score":27},
            "synopsis":"",
            "posters":{
              "thumbnail":"http://resizing.flixster.com/DeLpPTAwX3O2LszOpeaMHjbzuAw=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/11/16/47/11164719_ori.jpg",
              "profile":"http://resizing.flixster.com/DeLpPTAwX3O2LszOpeaMHjbzuAw=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/11/16/47/11164719_ori.jpg",
              "detailed":"http://resizing.flixster.com/DeLpPTAwX3O2LszOpeaMHjbzuAw=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/11/16/47/11164719_ori.jpg",
              "original":"http://resizing.flixster.com/DeLpPTAwX3O2LszOpeaMHjbzuAw=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/11/16/47/11164719_ori.jpg"},
            "abridged_cast":[
              {
                "name":"Keanu Reeves",
                "id":"162654049",
                "characters":["Eddie Kasalivich"]},
              {"name":"Morgan Freeman",
              "id":"162652224",
              "characters":["Paul Shannon"]},
              {"name":"Rachel Weisz",
              "id":"162653682",
              "characters":["Dr. Lily Sinclair"]},
              {"name":"Fred Ward",
              "id":"162667867",
              "characters":["Agt. Leon Ford"]},
              {"name":"Kevin Dunn",
              "id":"162664658",
              "characters":["Agt. Doyle"]}],
            "alternate_ids":{"imdb":"0115857"},
            "links":{
              "self":"http://api.rottentomatoes.com/api/public/v1.0/movies/11494.json",
              "alternate":"http://www.rottentomatoes.com/m/1072457-chain_reaction/",
              "cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/11494/cast.json",
              "reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/11494/reviews.json",
              "similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/11494/similar.json"
            }
          }],
  };
  static navigationOptions = ({ navigation }) =>{
    return {
      title: '首页',
      headerTitle: () =><LogoTitle />,
      headerRight:navigation.getParam('headerRight'),
      headerLeft: () => (
        <Button
          onPress={navigation.getParam('headerLeftEvent')}
          title="点击+1" color="#fff"
        />
      ),
    }  
  };
  //自定义导航按钮
  _headerRight=()=> {
    return (
      <TouchableOpacity style={{marginRight:20}} 
                        activeOpacity={0.7}
                        onPress={()=>this.props.navigation.navigate('SettingScreen')}>
        <Image source={require('../imgs/setting.png')}/>
      </TouchableOpacity>
    )
  }
  //自定义导航事件
  _headerLeftEvent = () => {
    this.setState({ count: this.state.count + 1 });
  };
  componentDidMount() {
    this.props.navigation.setParams({ headerLeftEvent: this._headerLeftEvent });
    this.props.navigation.setParams({ headerRight: this._headerRight });
    
    this.fetchData();

  }
  fetchData= async ()=>{
    LoaddingIndicator.show()
    try {
      let response = await fetchGet(REQUEST_URL);
      let responseJson = await response.json();
      LoaddingIndicator.hide();
      // console.log(JSON.stringify(responseJson))
      var datas = this.state.datas.length==1?responseJson.movies:this.state.datas.concat(responseJson.movies);
      this.setState({
        datas: datas,
        refreshing:false,
        emtyText:datas.length==0?'暂无数据':''
      });
    } catch (error) {
      LoaddingIndicator.hide();
      if(this.state.refreshing){
        this.setState({
          refreshing:false
        })
      }
      var msg = null
      if(error.toString().indexOf('request failed') != -1){
        msg = "网络请求失败"
      }else if(error.toString().indexOf('error') != -1){
        msg = "请求失败"
      }
      this.setState({
        emtyText:msg,
        datas:this.state.datas.length>1?this.state.datas:[],
      })
      console.log('err:',error)
    }
  }
  _onRefresh=()=> {
    
    this.setState({
      refreshing:true
    })
    setTimeout(()=>{
      this.fetchData();
    },1000)
  }
  _didSelectItem(item) {
    this.props.navigation.navigate('DetailsScreen',{
      title:item.title,
      callback:(param) => {
            // alert(JSON.stringify(param));
            item.browse = true
            this.setState({
              datas:this.state.datas
            })
          }
      })
  }
  render() {
    const { count } = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Text>点击次数 {count}</Text>
        </View>
        <FlatList style={styles.list} 
                  contentContainerStyle={styles.contentContainer}
                  data={this.state.datas}
                  renderItem={this._renderItem1}
                  extraData={this.state}
                  keyExtractor={(item,index) => item.id+index}
                  ItemSeparatorComponent={this._renderItemSeparator}
                  ListEmptyComponent={this._renderEmpty}
                  ListHeaderComponent={this._renderHeader}
                  ListFooterComponent={this._renderFooter}
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  onEndReachedThreshold={0.3}
                  onLayout={e=> {
                    let height = e.nativeEvent.layout.height;
                    if (this.state.flatlistHeight < height) {
                      this.setState({ flatlistHeight: height })
                    }
                  }}
                  onEndReached={(info)=> {
                    console.log(`距离底部${info.distanceFromEnd},加载更多`)
                    if(info.distanceFromEnd>0){
                      //加载更多
                      Toast.show('没有更多数据了',{duration:1000,position: Toast.positions.CENTER})
                    }
                  }}
        />
      </View>
    );
  };

  _renderItem1 = ({item, index, separators})=> {
    //在Screen中跳转
    return (
      <HomeCell item={item} didSelectItem={()=>this._didSelectItem(item)}/>
    )
  }
  _renderItem2 = ({item, index, separators})=> {
    //在cell中跳转,使用withNavigation()
    return (
      <HomeCell item={item}/>
    )
  }
  _renderItem = ({item, index, separators})=> {
    return (
      <TouchableOpacity style={styles.cellContainer} 
                        activeOpacity={0.8} onPress={()=>this._didSelectItem(item)}>
        <View style={styles.cellConent}>
          <Image style={styles.thumbnail}
                source={{ uri: item.posters.thumbnail }}
                defaultSource={require('../imgs/bifenxi.png')}
          />
          <View style={styles.rightContainer}>
            <Text style={[styles.title,item.browse?{color:'#3f54da'}:{}]}>{item.title}</Text>
            <Text style={styles.year}>{item.year}</Text>
          </View>
        </View>
        <Image source={require('../imgs/more.png')} style={{margin:10}}/>
      </TouchableOpacity>
    );
  };
  _renderItemSeparator=()=> {
    return (
      <View style={{height:1,backgroundColor:'#f0f0f0',}}></View>
    )
  };
  _renderEmpty=()=> {
    return (
      <View style={{flex:1,height:this.state.flatlistHeight, justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../imgs/errimg.png')} style={{marginBottom:20,marginTop:-50}}/>
        {this.state.emtyText.indexOf('失败')!=-1
          ?<TouchableOpacity style={{height:50,borderRadius:25,overflow:'hidden'}} 
                            activeOpacity={0.8}
                            onPress={()=>{
                              this.fetchData()
                            }}>
            <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#eb5400','#fcbb47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={[styles.emtyText,{color:'#fff'}]}>{this.state.emtyText},点击重试</Text>
            </LinearGradient>
          </TouchableOpacity>
          :<Text style={styles.emtyText}>{this.state.emtyText}</Text>}
        
      </View>
    )
  };
  _renderHeader=()=> {
    if(this.state.datas.length<=1){
      return null;
    }
    return (
      <View style={{alignItems:'center',padding:10,backgroundColor:'#fff'}}>
        <Text>数据列表</Text>
      </View>
    )
  }
  _renderFooter=()=> {
    if(this.state.datas.length>1){
      return (
        <View style={{width:'100%',height:40,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'#9caac6',fontSize:12}}>- 已经到底了 -</Text>
        </View>
      )
    }else{
      return null;
    }
    
  };
}

class LogoTitle extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>影视列表</Text>
        {/* <Image
          source={require('../imgs/bifenxi.png')}
          style={{ flex:1, height: 44,resizeMode:'contain'}}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  header: {
    flexDirection:'row',
    alignItems:'center',
    height:50,
    backgroundColor:'#f0f0f0',
    paddingLeft:20,
  },
  list: {
    flex:1,
    backgroundColor:'#F1F1F1',
  },
  contentContainer: {
    marginRight:10,
    marginLeft:10
  },
  cellContainer: {
    marginTop:5,
    marginBottom:5,
    borderRadius:5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  cellConent: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems:'flex-start',
    marginTop:10,
    marginBottom:10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  year: {
    color:'#333',
    fontSize:14,
  },
  thumbnail: {
    width: 53,
    height: 81,
    margin:10,
    borderRadius:5,
  },
  emtyText: {
    color:'#666',
    fontWeight:'bold',
    fontSize:16,
    paddingRight:20,
    paddingLeft:20,
  }
});
