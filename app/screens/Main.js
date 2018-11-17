import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Linking } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import config from './../utils/Config';
import MapHeader from './../components/MapHeader';
import VersionNumber from 'react-native-version-number';
import SlidingUpPanel from 'rn-sliding-up-panel';
import CommonStyles from '../styles/Common';
import IS_ANDROID from '../utils/Helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetStore } from '../utils/BreweryStore';
import BreweryDetailsList from '../components/BrewereyDetailsList';
import BreweryLoader from '../components/BreweryLoader'

Mapbox.setAccessToken(config.get('accessToken'));
const mapUrl = config.get('mapUrl');
const { height } = Dimensions.get('window');

  const layerStyles = Mapbox.StyleSheet.create({
    singleBrewery: {
      textField: '{name}',
      textSize: 12,
      textPitchAlignment: 'map',
      iconImage: 'beer-15',
      textAnchor: 'bottom',
      textOffset: [0, -0.5],
      textOptional: true
    },
  
    clusteredBreweries: {
      circlePitchAlignment: 'map',
      circleColor: CommonStyles.lightPrimaryColor,
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
    headerContainer: {
      position: 'absolute',
      flex: 1,
    },
    version:{
      position: 'absolute',
      bottom: 40,
      right: 10,
    },
    containerSheet: {
      flex: 1,
      margin: 10,
    },
    panel: {
      flex: 1,
      backgroundColor: CommonStyles.defaultPrimaryColor,
      position: 'relative'
    },
    panelHeader: {
      height: 40,
      backgroundColor: CommonStyles.defaultPrimaryColor,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
 
  export default class Main extends Component {

    static defaultProps = {
      draggableRange: {
        top: height,
        bottom: 110
      }
    }

    constructor(props) {
      super(props);

      this.state = {
        breweries: undefined,
        searchedBreweries: [],
        location: undefined,
        isFetchingAndroidPermission: IS_ANDROID,
        isAndroidPermissionGranted: false,
        allowDragging: true,
      };
  
      this.onPress = this.onPress.bind(this);
      this.centerOnBrewery = this.centerOnBrewery.bind(this);
      this.search = this.search.bind(this);
      this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    }

    async componentDidMount() {
      console.log('componentDidMount');
      if (IS_ANDROID) {
        const isGranted = await Mapbox.requestAndroidLocationPermissions();
        this.setState({
          isAndroidPermissionGranted: isGranted,
          isFetchingAndroidPermission: false,
        });
      }

      return await Promise.resolve(1);
    }
  
    onPress(event) {
      const feature = event.nativeEvent.payload;
      console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
      const { geometry } = feature;
  
      const breweries = [];
      if (typeof geometry.coordinates[1] === 'number' &&
          typeof geometry.coordinates[0] === 'number') {
          breweries.push({
            key: feature.id,
            title: feature.properties.name,
            adr1: feature.properties.adresse4 ,
            adr2: feature.properties.adresse6,
            web: feature.properties.website,
            fb: feature.properties.facebook,
            email: feature.properties.email,
            coordinates: feature.geometry.coordinates,
        });
        this._panel.transitionTo(240);
      } else {
        this._panel.transitionTo(0);
      }
      this.setState({searchedBreweries: breweries})
  }

    onUserLocationUpdate (location) {
      console.log(location);
      this.setState({ location: location });
    }
    
    centerOnUser (location) {
      
       if (location) {
        this.map.setCamera({
          centerCoordinate: [location.coords.longitude, location.coords.latitude],
          zoom: 14,
        });
      }
    }

    search(text){
      console.log(text);
      const textToSearch = text.toLowerCase().trim();
      const breweries = GetStore().features;
      const results = breweries.filter(function(feature) {
        return feature.properties.name.toLowerCase().includes(textToSearch);
      })
        .map(function(feature){
          return {
            key: feature.id,
            title: feature.properties.name,
            adr1: feature.properties.adresse4 ,
            adr2: feature.properties.adresse6,
            web: feature.properties.website,
            fb: feature.properties.facebook,
            email: feature.properties.email,
            coordinates: feature.geometry.coordinates,
          }
        });
      this.setState({
        searchedBreweries: results,
      });
      console.log(results);
    }

    centerOnBrewery(coordinates) {
      console.log('centerOnBrewery: '+coordinates);
      this._panel.transitionTo(0);
      this.map.setCamera({
        centerCoordinate: coordinates,
        zoom: 14,
      });    
    }

    onPressCompass() {
      this.map.setCamera({heading: 0});
    }

    handlePanelDragging = () => {
      this.setState({allowDragging: !this.state.allowDragging })
    }

    renderDetails() {
      if(!this.state.searchedBreweries.length) {
        return;
      }
      return(
        <BreweryDetailsList
          breweries={this.state.searchedBreweries}
          onPress={this.centerOnBrewery}
          onPressIn={() => {this.handlePanelDragging()}}    
          onPressOut={() => {this.handlePanelDragging()}} 
         >
        </BreweryDetailsList>
      )
    }

    render() {
      return (
        <View style={styles.container}>
          <BreweryLoader onBreweriesLoaded={(breweries) => this.setState({ breweries })} />

          <Mapbox.MapView
              styleURL={mapUrl}
              showUserLocation={true}
              compassEnabled={false}
              zoomEnabled={true}
              userTrackingMode={Mapbox.UserTrackingModes.Follow}
              onUserLocationUpdate={this.onUserLocationUpdate}
              zoomLevel={4.81}
              centerCoordinate={[3.315401, 47.077385]}
              style={styles.container}
              ref={(c) => (this.map = c)} >

            <Mapbox.ShapeSource
              id="breweries"
              cluster
              clusterRadius={25}
              clusterMaxZoom={12}
              shape={this.state.breweries}
              onPress={this.onPress} >

              <Mapbox.SymbolLayer
                id="pointCount"
                style={layerStyles.clusterCount} />

              <Mapbox.CircleLayer
                id="clusteredBreweries"
                belowLayerID="pointCount"
                filter={['has', 'point_count']}
                style={layerStyles.clusteredBreweries} />

              <Mapbox.SymbolLayer
                id="singleBrewery"
                filter={['!has', 'point_count']}
                style={layerStyles.singleBrewery}
                belowLayerID="pointCount" />

            </Mapbox.ShapeSource>      
          </Mapbox.MapView>

          <MapHeader 
            style={styles.headerContainer}
            onSearch={(text) => this.search(text)}
            onPressCompass={() => this.onPressCompass()}
            onPressCenter={() => this.centerOnUser(this.state.location)} />

          <Text style={styles.version}>Version {VersionNumber.appVersion}</Text>

          <SlidingUpPanel
            visible
            allowDragging={this.state.allowDragging}
            startCollapsed
            showBackdrop={false}
            ref={c => this._panel = c}
            draggableRange={this.props.draggableRange} 
            >

            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <Icon
                  name={'minus'}
                  size={20}
                  color={CommonStyles.primaryTextColor}/>
              </View>
              {this.renderDetails()}
            </View>
          </SlidingUpPanel>
        </View>
      );
    }
  }

  