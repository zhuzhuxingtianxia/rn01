import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity, Text, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

 class HomeCell extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  _onPress=()=> {
    if(this.props.didSelectItem){
        this.props.didSelectItem(this.props.item);
    }else{
        this.props.navigation.navigate('DetailsScreen',{
            title:this.props.item.title,
            callback:(param) => {
                  alert(JSON.stringify(param));
                }
            })
    }
    
  }
  render() {
      const {item} = this.props
    return (
      <TouchableOpacity style={styles.cellContainer} 
                        activeOpacity={0.8} onPress={this._onPress}>
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
  }
}

export default withNavigation(HomeCell);

const styles = StyleSheet.create({
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
  }
});
