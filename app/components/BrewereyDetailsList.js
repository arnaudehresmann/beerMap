import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import BreweryDetails from './BreweryDetails';
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
                 <BreweryDetails
                 title={item.title}
                 adr1={item.adr1}
                 adr2={item.adr2}
                 fb={item.fb}
                 email={item.email}
                 web={item.web}>
                </BreweryDetails>}></FlatList>
          </View>

        );
    }

}