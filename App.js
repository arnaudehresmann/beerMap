import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import config from './utils/config';
import breweries from './map/features.json'
import Bubble from './components/bubble'
import Search from './components/search'
import Icon from 'react-native-vector-icons/FontAwesome';

Mapbox.setAccessToken(config.get('accessToken'));
const mapUrl = config.get('mapUrl');

  const layerStyles = Mapbox.StyleSheet.create({
    singleBrewery: {
      textField: '{title}',
      textSize: 12,
      textPitchAlignment: 'map',
      iconImage: 'beer-15',
      textAnchor: 'bottom',
      textOffset: [0, -0.5],
      textOptional: true
    },
  
    clusteredBreweries: {
      circlePitchAlignment: 'map',
      circleColor: 'orange',
      circleRadius: Mapbox.StyleSheet.source(
        [[0, 15], [100, 20], [750, 30]],
        'point_count',
        Mapbox.InterpolationMode.Exponential,
      ),
      circleOpacity: 0.84,
      circleStrokeWidth: 2,
      circleStrokeColor: 'white',
    },
  
    clusterCount: {
      textField: '{point_count}',
      textSize: 12,
      textPitchAlignment: 'map',
    },
  });

  const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    zoomContainer:{
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'gray',
      padding: 10,
      borderRadius: 30,
    },
    zoomIn:{
    },
  })

  export default class App extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        latitude: undefined,
        longitude: undefined,
        title: undefined,
        adr1: undefined,
        adr2: undefined,
      };
  
      this.onPress = this.onPress.bind(this);
    }
  
    get hasValidLastClick() {
      return (
        typeof this.state.latitude === 'number' &&
        typeof this.state.longitude === 'number'
      );
    }

    onMapPress(event)
    {
      console.log('You pressed the map here is your feature', event); // eslint-disable-line      
    }

    onPress(event) {
      const feature = event.nativeEvent.payload;
      console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
      const { geometry, properties } = feature;
  
      this.setState({
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
        title: properties.title,
        adr1: properties.bra_adresse_4 ,
        adr2: properties.bra_adresse_6,
      });
    }

    renderLastClicked() {
      if (!this.hasValidLastClick) {
        return;
      }
  
      return (
        <Bubble>
          <Text>{this.state.title}</Text>
          <Text>{this.state.adr1}</Text>
          <Text>{this.state.adr2}</Text>
        </Bubble>
      );
    }

    render() {
      return (
        <View style={styles.container}>



          <Mapbox.MapView
              styleURL={mapUrl}
              showUserLocation={true}
              zoomLevel={4.81}
              centerCoordinate={[3.315401, 47.077385]}
              style={styles.container}
              onPress={this.onMapPress}
              ref={(c) => (this.map = c)}
              >
         <Mapbox.ShapeSource
            id="breweries"
            cluster
            clusterRadius={25}
            clusterMaxZoom={12}
            shape={breweries}
            onPress={this.onPress}
            >
            <Mapbox.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />

            <Mapbox.CircleLayer
              id="clusteredBreweries"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredBreweries}
            />

            <Mapbox.SymbolLayer
              id="singleBrewery"
              filter={['!has', 'point_count']}
              style={layerStyles.singleBrewery}
              belowLayerID="pointCount"
            />
          </Mapbox.ShapeSource>      
          </Mapbox.MapView>
          {this.renderLastClicked()}
          <Search></Search>

<View style={styles.zoomContainer}>
<TouchableOpacity
onPress={() => {
  this.map.getZoom().then((zoom) => {
    console.log(zoom)
    this.map.zoomTo(zoom+1)
  })
}}>
<Icon
        name='plus'
        size={30}
        style={styles.zoomIn}
        color='white'
        />
</TouchableOpacity>
<TouchableOpacity
onPress={() => {
  this.map.getZoom().then((zoom) => {
    console.log(zoom)
    this.map.zoomTo(zoom-1)
  })
}}>
      <Icon
        name='minus'
        size={30}
        style={styles.zoomIn}
        color='white'
        />
</TouchableOpacity>

</View>
        </View>
      );
    }
  }

  