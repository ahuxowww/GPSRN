import React, {useRef, ReactNode, useEffect, useState} from 'react';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import {View} from 'react-native-ui-lib';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {Colors, Metrics} from '../../../assets';
import Geolocation from 'react-native-geolocation-service';
import {calculateDistance} from '@src/domain/map';
import {Marker} from './Marker';
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
  const {onPress, children, data} = props;
  const [speed, setSpeed] = useState<number | null>(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [previousPosition, setPreviousPosition] = useState<any | null>(null);
  const mapRef = useRef<any>(null);
  const mapOptions = {
    scrollEnabled: true,
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        if (previousPosition) {
          // Tính khoảng cách giữa các vị trí liên tiếp
          const distance = calculateDistance(
            previousPosition.coords.latitude,
            previousPosition.coords.longitude,
            position.coords.latitude,
            position.coords.longitude,
          );
          setTotalDistance(totalDistance + distance);
        }
        setPreviousPosition(position);
        const currentSpeed = position.coords.speed;
        console.log(position);
        setSpeed(currentSpeed);
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 1, // Lọc sự thay đổi vị trí sau mỗi mét
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
        zoomControlEnabled
        onMapReady={() => {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(granted => {
            console.log(granted);
          });
        }}>
        <Marker
          isGGMap
          data={{
            location: {
              lat: previousPosition?.coords?.latitude,
              lon: previousPosition?.coords?.longitude,
            },
            type: 'car',
            heading: previousPosition?.coords?.heading
          }}
        />
      </MapView>
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
