import React from 'react'
import { View, Text, NetInfo, AsyncStorage } from 'react-native'
import Config from '../utils/Config'
import { CreateStore } from '../utils/BreweryStore'

export default class Loading extends React.Component {

    constructor(props) {
      super(props);

      this.connnectionStateChanged = this.connnectionStateChanged.bind(this);
    }

    async componentDidMount() {
        NetInfo.addEventListener(
          'connectionChange',
          this.connnectionStateChanged
        );
  
        let breweries = undefined;
  
        let isConnected = await NetInfo.isConnected.fetch();
        if(isConnected) {
            breweries = await this.loadOnlineBreweries()
        } else {
            breweries = await this.getOfflineBreweries();
            CreateStore(breweries);
        }
        this.props.onBreweriesLoaded(breweries);
  
        return await Promise.resolve(1);
    }
  
    async connnectionStateChanged(connnectionInfo) {
      let isConnected = await NetInfo.isConnected.fetch();
      if(isConnected) {
        const breweries = await this.loadOnlineBreweries()
        this.props.onBreweriesLoaded(breweries);
      } 
    }
  
    async saveBreweriesToDisk(breweries) {
      try {
        console.log(JSON.stringify(breweries));
        await AsyncStorage.setItem(Config.get("breweriesSorageKey"), JSON.stringify(breweries));
      } catch (error) {
        console.error(error);
      }
    }
  
    async loadOnlineBreweries() {
      breweries = await this.getOnlineBreweries();
      await this.saveBreweriesToDisk(breweries);
      CreateStore(breweries);
      return breweries
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
      const emptyBreweries =  {
          "type": "FeatureCollection",
          "features":[]
      };
  
      try {
        const breweries = await AsyncStorage.getItem(Config.get("breweriesSorageKey"));
        if (breweries !== null) {
          return JSON.parse(breweries);
        }
      }
      catch (error) {
        console.error(error);
      }
      return emptyBreweries;
    }
  

    render () {
        return (<View></View>);
    }
}
