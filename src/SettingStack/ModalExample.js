import React, { Component } from "react";
import { StyleSheet, Modal, Text, TouchableHighlight, View } from "react-native";

class ModalExample extends Component {
  state = {
    modalVisible: false
  };
  static navigationOptions = ({ navigation }) =>{
    return {
      title: 'ModalExample',
    }  
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Modal
          animationType={"fade"}//enum('none', 'slide', 'fade')
          transparent={true}
          visible={this.state.modalVisible}
          onShow={() => {
              console.log('onShow')
          }}
          onDismiss={() => {
            console.log('onDismiss')
          }}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.bgContainer}>
            <View style={styles.content}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{padding:10}}>Hello World!</Text>
              </View>
              <TouchableHighlight style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={{color:'#fff'}}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
            <TouchableHighlight style={styles.button}
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                                >
                <Text style={{color:'#fff'}}>Show Modal</Text>
            </TouchableHighlight>   
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'rgba(178,178,178,0.8)',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    content:{
        backgroundColor:'#fff',
        width:'60%',
        padding:20,
        borderRadius:5
    },
    button: {
        height:40,
        borderRadius:5,
        backgroundColor:'red',
        paddingRight:10,
        paddingLeft:10,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default ModalExample;