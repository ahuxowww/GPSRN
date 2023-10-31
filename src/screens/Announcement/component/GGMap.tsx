import React, {useRef, ReactNode, useEffect, useState} from 'react';
import {StyleSheet, PermissionsAndroid, InteractionManager} from 'react-native';
import {View} from 'react-native-ui-lib';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, Metrics} from '../../../assets';
import Geolocation from 'react-native-geolocation-service';
import {calculateDistance} from '@src/domain/map';
import {Marker} from './Marker';
import {useVehicle} from '@src/hooks/vehicle';
import {format} from 'date-fns';
import {useConnectMap} from '@src/hooks/map';
import {useUserLogin} from '@src/hooks/user';

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
  const {followUser} = useUserLogin();

  const {
    getSpeed,
    getDateMap,
    getDistance,
    onChangeDateMap,
    onChangeStateMap,
    onChangeSpeedMap,
    onChangeDistanceMap,
  } = useConnectMap();

  const [previousPosition, setPreviousPosition] = useState<any | null>(null);
  const mapRef = useRef<any>(null);
  const {getVehicle} = useVehicle();
  const mapOptions = {
    scrollEnabled: true,
  };

  useEffect(() => {
    if (getDateMap) {
      if (
        format(new Date(getDateMap), 'yyyy-MM-dd') !==
        format(new Date(), 'yyyy-MM-dd')
      ) {
        onChangeDateMap({date: new Date()});
        onChangeDistanceMap({distance: 0});
        onChangeSpeedMap({speed: 0});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDateMap]);

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
});
