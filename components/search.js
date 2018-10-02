import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const styles = StyleSheet.create({
    search: {
      position:'absolute',
      top: 10,
      left: 10,
      right: 10,
      bottom: 0,
      minHeight: 40,
    },
    searchBox:{
      backgroundColor:'white',
      borderRadius: 30,
      padding: 15,
    }
});

export default class Search extends Component {

    constructor(props) {
      super(props);
    }   

    render (){
        return (
            <View style={styles.search}>
              <TextInput
                returnKeyType='search'
                selectTextOnFocus={true}
                style={styles.searchBox}
                placeholder="Search">   
              </TextInput>
            </View>
        );        
    }
  }