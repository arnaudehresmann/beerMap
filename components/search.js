import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
    searchInput:{
        flex: 1,
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 15,
      },
});

export default class Search extends Component {

    constructor(props) {
      super(props);
    }   

    render (){
        return (
            <TextInput
                style={styles.searchInput}
                returnKeyType='search'
                selectTextOnFocus={true}
                placeholder="Search">   
            </TextInput>    
        );        
    }
  }