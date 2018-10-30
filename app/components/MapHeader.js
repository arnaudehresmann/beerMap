import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ClickableIcon from './ClickableIcon'
import Search from './Search';

const styles = StyleSheet.create({
    headerContainer:{
      flexDirection: 'row',
    },
    container:{
        flex:1,
        justifyContent: 'center',
        padding: 10,
    },
    search:{
        flex: 6,
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
                <Search style={styles.search}></Search>
                <View style={styles.container}>
                    <ClickableIcon
                        onPress={this.props.onPressCenter}
                        name={'crosshairs'}
                        size={20}
                    />
                </View>
            </View>
        );
    }
}