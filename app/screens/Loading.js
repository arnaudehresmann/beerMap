import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase, { config } from 'react-native-firebase'
import BreweryLoader from '../components/BreweryLoader'

export default class Loading extends React.Component {

    constructor(props) {
      super(props);

      this.onBreweriesLoaded = this.onBreweriesLoaded.bind(this);
    }
    
  onBreweriesLoaded() {
    firebase.auth().onAuthStateChanged(user => {          
      this.props.navigation.navigate(user ? 'Main' : 'Main');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <BreweryLoader onBreweriesLoaded={this.onBreweriesLoaded}></BreweryLoader>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})