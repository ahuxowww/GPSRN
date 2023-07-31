import React, {useRef, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import MapView, {MAP_TYPES, PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, Metrics} from '../../../assets';

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
  const mapRef = useRef<any>(null);
  const mapOptions = {
    scrollEnabled: true,
  };

  const hiddenPoi = [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        loadingIndicatorColor={Colors.greyNightRider}
        loadingBackgroundColor={Colors.white}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // mapType={mapType}
        // initialRegion={centerDefault}
        onPress={onPress}
        {...mapOptions}
        region={{
          latitude: parseFloat(data?.location.lat),
          longitude: parseFloat(data?.location.lon),
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        // hidden
        showsTraffic
        rotateEnabled
        showsMyLocationButton
        showsIndoorLevelPicker
        pitchEnabled
        zoomControlEnabled
        // onMapLoaded={() => toggleLoad(false)}
      >
        {children}
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
