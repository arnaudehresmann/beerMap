import React, { Component } from 'react';
import { View, Linking, StyleSheet, Text } from 'react-native';
import Bubble from './../components/Bubble'
import ClickableIcon from './../components/ClickableIcon';

const styles = StyleSheet.create({
    detailIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 5,
    },
    detailIcon: {
      margin: 5,
    }

  });

export default class BreweryDetails extends Component {

    renderIcon(link, iconName) {
        if(!link){
            return null;
        }

        return(
            <ClickableIcon 
            name={iconName}
            touchStyle={styles.detailIcon}
            onPress={()=> Linking.openURL(link)}
            size={25} />)  
    }

    renderFbIcon(){
        return this.renderIcon(this.props.fb, 'facebook-square');
    }

    renderEmailIcon() {
       if(!this.props.email){
            return null;
        }
        return this.renderIcon('mailto:' + this.props.email, 'at');
    }

    renderWWWIcon() {
        return this.renderIcon(this.props.web, 'globe');
    }

    renderAddress() {    
        return (
          <View>
            <Text>{this.props.title}</Text>
            <Text>{this.props.adr1}</Text>
            <Text>{this.props.adr2}</Text>
          </View>
        );
      }
  

    render() {
        return (
            <View style={this.props.style}>
            <Bubble>
              {this.renderAddress()}
            </Bubble>
            <View style={styles.detailIcons}>
               {this.renderFbIcon()}
               {this.renderEmailIcon()}
               {this.renderWWWIcon()}
            </View>
          </View>

        );
    }
}