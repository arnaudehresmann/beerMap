import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import BreweryDetails from './BreweryDetails';
import CommonStyles from '../styles/Common';

const styles = StyleSheet.create({
    item: {
        margin: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: CommonStyles.dividerColor,
    }
  });
  export default class BreweryDetailsList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <FlatList 
                 data={this.props.breweries}
                 renderItem={({item}) => 
                    <View>
                        <BreweryDetails  
                            style={styles.item}
                            onPress={() => this.props.onPress(item.coordinates)}  
                            onPressIn={this.props.onPressIn}
                            onPressOut={this.props.onPressOut}                        
                            title={item.title}
                            adr1={item.adr1}
                            adr2={item.adr2}
                            fb={item.fb}
                            email={item.email}
                            web={item.web}>
                        </BreweryDetails>                     
                    </View>
                }>
                </FlatList>
          </View>

        );
    }

}