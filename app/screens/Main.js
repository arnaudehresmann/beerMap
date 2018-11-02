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
import BreweryDetails from '../components/BreweryDetails';
import { GetStore } from '../utils/BreweryStore';

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
        location: undefined,
        latitude: undefined,
        longitude: undefined,
        title: undefined,
        adr1: undefined,
        adr2: undefined, 
        web: undefined,
        fb: undefined,
        email: undefined,
        currentUser: null,  
        isFetchingAndroidPermission: IS_ANDROID,
        isAndroidPermissionGranted: false,
      };
  
      this.onPress = this.onPress.bind(this);
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
        title: properties.name,
        adr1: properties.adresse4 ,
        adr2: properties.adresse6,
        web: properties.website,
        fb: properties.facebook,
        email: properties.email,
      });

      console.log("is valid: " + this.hasValidLastClick);
      if (typeof geometry.coordinates[1] === 'number' &&
          typeof geometry.coordinates[0] === 'number') {
        this._panel.transitionTo(240);
      } else
      {
        this._panel.transitionTo(0);
      }
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

    async search(text){
      console.log(text);
      const breweries = GetStore().features;
      const results = breweries.filter(function(feature) {
        return feature.properties.name.includes(text);
      });
      console.log(results);
      return Promise.resolve(1);
    }

    onPressCompass() {
      this.map.setCamera({heading: 0});
    }

    renderLastClicked() {
      if (!this.hasValidLastClick) {
        return;
      }
      return (
        <BreweryDetails
        style={styles.containerSheet} 
        title={this.state.title}
        adr1={this.state.adr1}
        adr2={this.state.adr2}
        fb={this.state.fb}
        email={this.state.email}
        web={this.state.web}>
      </BreweryDetails>
  
      );
    }

    render() {
      return (
        <View style={styles.container}>

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
              onPress={this.onMapPress}
              ref={(c) => (this.map = c)} >

            <Mapbox.ShapeSource
              id="breweries"
              cluster
              clusterRadius={25}
              clusterMaxZoom={12}
              shape={GetStore()}
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
              {this.renderLastClicked()}
            </View>
          </SlidingUpPanel>
        </View>
      );
    }
  }

  