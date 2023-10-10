import React, {useRef, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import Mapbox from '@rnmapbox/maps';
import {Metrics} from '@src/assets';

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

export const GLMap = (props: GGMapProps) => {
  const {onPress, children, data} = props;
  Mapbox.setAccessToken('KZTuCSDJih2VKXahwF6zvs6z4N3uS0o4NusM97c5');
  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const GoongMapURLStyle = `https://tiles.goong.io/assets/goong_map_dark.json?api_key=${MAP.API_KEY_GOONGMAP}`;
  const EKMapURLStyle = `https://api.ekgis.vn/v2/mapstyles/style/osmplus/night/style.json?api_key=${MAP.API_KEY_EKMAP}`;
  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

  function checkLatLon(lat: any, lon: any) {
    let validLat = regexLat.test(lat);
    let validLon = regexLon.test(lon);
    return validLat && validLon;
  }

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        ref={mapRef}
        style={styles.map}
        styleURL={GoongMapURLStyle}
        compassEnabled={false}
        localizeLabels={true}
        rotateEnabled={false}
        onPress={onPress}
        onDidFinishLoadingStyle={() => {
          //   toggleLoad(false);
        }}>
        {children}
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={12}
          minZoomLevel={9}
          //maxZoomLevel={12}
          centerCoordinate={
            checkLatLon(data?.location?.lat, data?.location?.lon)
              ? [Number(data?.location?.lon), Number(data?.location?.lat)]
              : [106.59004211425781, 11.15314007366473]
          }
          defaultSettings={{
            zoomLevel: 10,
          }}
          animationMode={'flyTo'}
          animationDuration={0}
        />
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrics.screen.height / 1.75,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
