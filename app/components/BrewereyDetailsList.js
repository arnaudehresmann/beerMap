import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
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
                    <TouchableOpacity 
                        onPress={() => this.props.onPress(item.coordinates)} 
                        onPressIn={this.props.onPressIn}
                        onPressOut={this.props.onPressOut}>
                        <BreweryDetails
                            title={item.title}
                            adr1={item.adr1}
                            adr2={item.adr2}
                            fb={item.fb}
                            email={item.email}
                            web={item.web}>
                        </BreweryDetails>                     
                    </TouchableOpacity>
                }>
                </FlatList>
          </View>

        );
    }

}