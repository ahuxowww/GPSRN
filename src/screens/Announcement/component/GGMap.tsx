import React, {
  useRef,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {Linking, Platform, StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, Metrics, Svgs} from '../../../assets';
import {Marker} from './Marker';
import {useVehicle} from '@src/hooks/vehicle';
import {useSelector} from 'react-redux';
import {LocationRedux} from '@src/redux/reducers';
import R from 'ramda';
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

  const mapRef = useRef<any>(null);
  const {getVehicle} = useVehicle();
  const mapOptions = {
    scrollEnabled: true,
  };
  const location = useSelector(
    R.pipe(LocationRedux.getReducerState, LocationRedux.selectors.getLocation),
  );

  const LastRegion: Region = {
    latitude: location?.f_latitude ?? 0,
    longitude: location?.f_longitude ?? 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.animateToRegion(LastRegion, 0);
    }, 100);
  }, []);

  const onFocusLocation = useCallback(() => {
    setTimeout(() => {
      mapRef.current?.animateToRegion(LastRegion, 1000);
    }, 100);
  }, [LastRegion]);

  const onGoToMaps = useCallback(() => {
    const url: any = Platform.select({
      ios: `comgooglemaps://?center=${location?.f_latitude},${location?.f_longitude}&q=${location?.f_latitude},${location?.f_longitude}&zoom=14&views=traffic"`,
      android: `geo://?q=${location?.f_latitude},${location?.f_longitude}`,
    });
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url = `https://www.google.de/maps/@${location?.f_latitude},${location?.f_longitude}`;
        return Linking.openURL(browser_url);
      }
    });
  }, [location?.f_latitude, location?.f_longitude]);

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
        followsUserLocation
        rotateEnabled
        showsMyLocationButton
        showsIndoorLevelPicker
        pitchEnabled>
        <Marker
          isGGMap
          data={{
            location: {
              lat: location?.f_latitude ?? 0,
              lon: location?.f_longitude ?? 0,
            },
            type: getVehicle,
            heading: location?.f_heading ?? 0,
          }}
        />
      </MapView>
      <View style={styles.buttonPosition}>
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={onFocusLocation}
          center>
          <Svgs.FocusLocation width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity
          marginT-24
          style={styles.buttonIcon}
          onPress={onGoToMaps}
          center>
          <Svgs.Directions width={32} height={32} />
        </TouchableOpacity>
      </View>
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
  buttonPosition: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  buttonIcon: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
});
