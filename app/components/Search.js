import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import CommonStyles from './../styles/Common';

const styles = StyleSheet.create({
    searchInput:{
        flex: 1,
        borderRadius: 30,
        backgroundColor: CommonStyles.defaultBackgroundColor,
        padding: 15,
        height:60,
      },
});

export default class Search extends Component {

    constructor(props) {
      super(props);
    }   

    render (){
        return (
            <TextInput
                style={[styles.searchInput, this.props.style]}
                returnKeyType='search'
                selectTextOnFocus={true}
                placeholder="Search">   
            </TextInput>    
        );        
    }
  }