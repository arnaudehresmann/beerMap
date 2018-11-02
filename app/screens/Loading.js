import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase, { config } from 'react-native-firebase'
import Config from '../utils/Config'
import { CreateStore } from '../utils/BreweryStore'
export default class Loading extends React.Component {

    async componentDidMount() {
      try {
        let response = await fetch(
          Config.get("breweriesUrl")
        );
        let breweries = await response.json();
        CreateStore(breweries);
        
      } catch (error) {
        console.error(error);
      }
      
      firebase.auth().onAuthStateChanged(user => {          
          this.props.navigation.navigate(user ? 'Main' : 'Main');
        });

        return await Promise.resolve(1);
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
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