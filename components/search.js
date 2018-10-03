import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    searchBar:{
        flex: 1,
        position:'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 0,
        minHeight: 30,  
    },
    searchBox:{
      backgroundColor:'white',
      borderRadius: 30,
      //padding: 15,
      flexDirection: 'row',
    },
    icon:{
        alignSelf:'center',
    }
});

export default class Search extends Component {

    constructor(props) {
      super(props);
    }   

    render (){
        return (
            <View style={styles.searchBar}>
                <View style={styles.searchBox}>
                    {/* <Icon style={styles.icon} name="rocket" size={30} color="#900" /> */}
                    <TextInput
                        returnKeyType='search'
                        selectTextOnFocus={true}
                        placeholder="Search">   
                    </TextInput>
                </View>
            </View>
        );        
    }
  }