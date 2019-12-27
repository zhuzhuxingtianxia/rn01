import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

var elements = [];
export default class AlertRoot extends React.Component {
    static show=(view)=> {
        let sibling = new RootSiblings(
        <TouchableOpacity
            style={styles.sibling}
            activeOpacity={1}
            onPress={() => {sibling.destroy()}}>
            {view}
        </TouchableOpacity>);
        elements.push(sibling);
    }

    static hide = () => {
        let lastSibling = elements.pop();
        lastSibling && lastSibling.destroy();
    }
}

var styles = StyleSheet.create({
    sibling: {
        position:'absolute',
        right:0,
        bottom:0,
        left:0,
        top:0,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    }
});