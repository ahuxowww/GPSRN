import React, {useRef, ReactNode, useEffect, useState} from 'react';
import {StyleSheet, PermissionsAndroid} from 'react-native';
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
import {MapThunk} from '@src/redux/thunks';

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

  useEffect(() => {
    if (
      (getVehicle === 'car' && getSpeed * 3.6 > 60) ||
      (getVehicle === 'motor' && getSpeed * 3.6 > 40)
    ) {
      onChangeStateMap({stateMap: 1});
    }
  }, [getSpeed, getVehicle, onChangeStateMap]);

  useEffect(() => {
    !followUser &&
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ]);
    Geolocation.getCurrentPosition(
      position => {
        mapRef.current?.animateToRegion({
          latitude: position?.coords?.latitude ?? 0,
          longitude: position?.coords?.longitude ?? 0,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [followUser]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        console.log({position});
        if (previousPosition) {
          // Tính khoảng cách giữa các vị trí liên tiếp
          const distance = calculateDistance(
            previousPosition.coords.latitude,
            previousPosition.coords.longitude,
            position.coords.latitude,
            position.coords.longitude,
          );
          if (distance > 0.5) {
            setTimeout(() => {
              onChangeDistanceMap({
                distance:
                  getDistance !== undefined ? getDistance + distance : distance,
              });
            }, 100);
          }
        }
        setPreviousPosition(position);
        const currentSpeed = position.coords.speed ?? 0;
        onChangeSpeedMap({speed: currentSpeed});
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        interval: 10000,
        distanceFilter: 1, // Lọc sự thay đổi vị trí sau mỗi mét
        fastestInterval: 5000, // Tối thiểu 5 giây giữa các cập nhật
        forceRequestLocation: true,
      },
    );
    // Ngừng xem vị trí khi không cần nữa
    return () => {
      Geolocation.clearWatch(watchId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        zoomControlEnabled></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrics.screen.height / 1.18,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
