import React, {useRef, ReactNode, useEffect, useState} from 'react';
import {StyleSheet, PermissionsAndroid, Touchable} from 'react-native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {Colors, Metrics, Svgs} from '../../../assets';
import {LineCoord} from '@src/screens/Announcement/component/inteface';
import {useCallback} from 'react';

interface GGMapProps {
  onPress?: (feature: any) => void;
  center?: {
    coords?: number[];
    zoom?: number;
  };
  children: ReactNode;
  apiRef?: any;
  camera?: any;
  data?: any;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const GGMap = (props: GGMapProps) => {
  const {onPress} = props;
  const journey = props?.data[0]?.my_journey ?? [];
  const mapRef = useRef<any>(null);
  const mapOptions = {
    scrollEnabled: true,
  };

  const renderStartMarker = () =>
    journey.length > 0 &&
    journey[0] && (
      <Marker
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
        tracksViewChanges={false} // improve performance when change carousel item
        coordinate={{
          latitude: journey[0]?.latitude,
          longitude: journey[0]?.longitude,
        }}>
        <Svgs.StartPoint height={15} width={15} fill={Colors.black} />
      </Marker>
    );
  const renderLastMarker = () =>
    journey.length > 0 &&
    journey[journey.length - 1] && (
      <Marker
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
        tracksViewChanges={false} // improve performance when change carousel item
        coordinate={{
          latitude: journey[journey.length - 1].latitude,
          longitude: journey[journey.length - 1].longitude,
        }}>
        <Svgs.FinishPoint height={15} width={15} fill={Colors.black} />
      </Marker>
    );
  const renderLines = (line: LineCoord[]) => {
    const modifiedData = line.map(({latitude, longitude}) => ({
      latitude: latitude,
      longitude: longitude,
    }));
    return (
      <React.Fragment>
        <Polyline
          coordinates={modifiedData}
          strokeColor={Colors.greenOcean}
          strokeWidth={4}
        />
      </React.Fragment>
    );
  };

  const lastRegion: Region = {
    latitude: journey.length > 0 ? journey[journey?.length - 1].latitude : 0,
    longitude: journey.length > 0 ? journey[journey?.length - 1].longitude : 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.animateToRegion(lastRegion, 1000);
    }, 100);
  }, [lastRegion]);

  const onFocusLocation = useCallback(() => {
    setTimeout(() => {
      mapRef.current?.animateToRegion(lastRegion, 1000);
    }, 100);
  }, [lastRegion]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        loadingIndicatorColor={Colors.greyNightRider}
        loadingBackgroundColor={Colors.white}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={onPress}
        {...mapOptions}
        showsCompass={false}
        followsUserLocation
        rotateEnabled
        showsMyLocationButton
        showsIndoorLevelPicker
        pitchEnabled>
        {renderLines(journey)}
        {renderStartMarker()}
        {renderLastMarker()}
      </MapView>
      <TouchableOpacity
        onPress={onFocusLocation}
        center
        style={styles.buttonDirection}>
        <Svgs.FocusLocation width={32} height={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrics.screen.height - 125,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonDirection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 40,
    width: 40,
    position: 'absolute',
    top: 60,
    right: 20,
  },
});
