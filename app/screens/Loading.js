import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, NetInfo, ConnectionType } from 'react-native'
import firebase, { config } from 'react-native-firebase'
import Config from '../utils/Config'
import { CreateStore } from '../utils/BreweryStore'
export default class Loading extends React.Component {

    async componentDidMount() {
      let connectionInfo = await NetInfo.getConnectionInfo();

      let breweries = undefined;

      let isConnected = await NetInfo.isConnected.fetch();
      if(isConnected) {
        breweries = await this.getOnlineBreweries();
      } else {
        breweries = await this.getOfflineBreweries();
      }

      CreateStore(breweries);
      
      firebase.auth().onAuthStateChanged(user => {          
          this.props.navigation.navigate(user ? 'Main' : 'Main');
        });

      return await Promise.resolve(1);
  }

  async getOnlineBreweries() {
    let breweries = {
        "type": "FeatureCollection",
        "features":[]
    };

    try {
      let response = await fetch(
        Config.get("breweriesUrl")
      );
      breweries = await response.json();
      
    } catch (error) {
      console.error(error);
    }  
    return breweries;
  }

  async getOfflineBreweries() {
    return {
        "type": "FeatureCollection",
        "features":[]
    };
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