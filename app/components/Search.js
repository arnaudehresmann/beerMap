import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import CommonStyles from './../styles/Common';

const styles = StyleSheet.create({
    searchInput:{
        flex: 1,
        borderRadius: 30,
        backgroundColor: CommonStyles.defaultBackgroundColor,
        paddingLeft: 15,
        height:40,
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
                onSubmitEditing={(event) => this.props.onSearch(event.nativeEvent.text)}
                returnKeyType='search'
                selectTextOnFocus={true}
                placeholder="Search">   
            </TextInput>    
        );        
    }
  }