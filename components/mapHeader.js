import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ClickableIcon from './clickableIcon'
import Search from './search';

const styles = StyleSheet.create({
    headerContainer:{
      flexDirection: 'row',
    },
    container:{
        flex:1,
        justifyContent: 'center',
        margin: 10,
    },
    search:{
        flex: 5,
        margin: 10, 
    }
});

export default class MapHeader extends Component {
    constructor(props) {
        super(props);   
    }
    

    render() {
        return (
            <View style={[styles.headerContainer, this.props.style]}>
                <View style={styles.container}>
                    <ClickableIcon
                        iconName={'bars'}
                        iconSize={20}
                    />
                </View>
                <Search style={styles.search}></Search>
                <View style={styles.container}>
                    <ClickableIcon
                        onPress={this.props.onPressCenter}
                        iconName={'crosshairs'}
                        iconSize={20}
                    />
                </View>
            </View>
        );
    }
}