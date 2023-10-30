import React, {useRef, ReactNode, useEffect, useState} from 'react';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, Metrics, Svgs} from '../../../assets';
import Geolocation from 'react-native-geolocation-service';
import {calculateDistance} from '@src/domain/map';
import {Marker} from './Marker';
import {useVehicle} from '@src/hooks/vehicle';
import {format} from 'date-fns';
import {useConnectMap} from '@src/hooks/map';
import {useUserLogin} from '@src/hooks/user';
import {MapThunk} from '@src/redux/thunks';
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

export const GGMap = (props: GGMapProps) => {
  const {onPress} = props;

  const [previousPosition, setPreviousPosition] = useState<any | null>(null);
  const mapRef = useRef<any>(null);
  const {getVehicle} = useVehicle();
  const mapOptions = {
    scrollEnabled: true,
  };

  const onFocusLocation = useCallback(() => {}, []);

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
        pitchEnabled
        zoomControlEnabled>
        <Marker
          isGGMap
          data={{
            location: {
              lat: previousPosition?.coords?.latitude,
              lon: previousPosition?.coords?.longitude,
            },
            type: getVehicle,
            heading: previousPosition?.coords?.heading,
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
          onPress={onFocusLocation}
          center>
          <Svgs.Directions width={32} height={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrics.screen.height - 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonPosition: {
    position: 'absolute',
    bottom: Metrics.screen.height / 2,
    right: 20,
  },
  buttonIcon: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
});
