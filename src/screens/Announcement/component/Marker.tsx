import React, {FC, memo, useEffect, useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Marker as GoogleMarker} from 'react-native-maps';
import Mapbox from '@rnmapbox/maps';
import {Images} from '@src/assets';

interface MarkerProps {
  data?: any;
  close?: () => void;
  isGGMap?: boolean;
}

interface MarkerImageProps {
  type: string; // Change this to the appropriate type if necessary
  heading: number; // Specify the type for heading (e.g., number)
}

const MarkerImage: FC<MarkerImageProps> = ({type, heading}) => {
  if (type === 'car') {
    return (
      <Image
        source={Images.logo.top_car}
        style={[
          styles.icon,
          {
            transform: [
              {
                rotate: `${heading ? heading : 0}deg`,
              },
            ],
          },
        ]}
      />
    );
  }
  if (type === 'motor') {
    return <Image source={Images.logo.top_motor} style={styles.icon} />;
  }
  return <Image source={Images.logo.top_motor} style={styles.icon} />;
};

const MarkerView: FC<MarkerProps> = ({isGGMap, data}) => {
  const markerRef = useRef(null);
  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  function checkLatLon(lat: any, lon: any) {
    let validLat = regexLat.test(lat);
    let validLon = regexLon.test(lon);
    return validLat && validLon;
  }

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.refresh();
    }
  }, [isGGMap]);

  if (!data && data?.location) {
    return null;
  }

  if (isGGMap) {
    return (
      <GoogleMarker
        zIndex={10}
        flat
        stopPropagation
        tracksViewChanges={true}
        coordinate={{
          longitude: data?.location?.lon ? Number(data?.location?.lon) : 0,
          latitude: data?.location?.lat ? Number(data?.location?.lat) : 0,
        }}
        onPress={() => {
          //
        }}>
        <View style={styles.container}>
          <MarkerImage type={data.type} heading={data.heading} />
        </View>
      </GoogleMarker>
    );
  }

  const GLMarkerCoord = checkLatLon(data?.location?.lat, data?.location?.lon)
    ? [Number(data?.location?.lon), Number(data?.location?.lat)]
    : [0, 0];

  return (
    <Mapbox.MarkerView
      id={data?.location?.lon + data?.location?.lat}
      anchor={{x: 0.5, y: 0.5}}
      coordinate={GLMarkerCoord}>
      <View style={styles.container}>
        <MarkerImage type={data.type} heading={data.heading} />
      </View>
    </Mapbox.MarkerView>
  );
};

export const Marker = memo(MarkerView);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
