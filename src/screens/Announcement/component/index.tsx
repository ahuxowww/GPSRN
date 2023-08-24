import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {GGMap} from './GGMap';
import {Marker} from './Marker';
import {Colors} from '../../../assets';
import Container from '../../component/Container';

const Map = () => {
  const {params}: any = useRoute();
  // const { userMapName } = useUserProfile();

  const renderMap = useCallback(() => {
    // if (!userMapName || userMapName === MapType.GGMap) {
    //   return (
    //     <GGMap data={params}>
    //       <Marker isGGMap data={params} />
    //     </GGMap>
    //   );
    // }
    // return (
    //   <GLMap data={params} mapType={userMapName}>
    //     <Marker data={params} />
    //   </GLMap>
    // );
    return (
      <GGMap data={params}>
        <Marker isGGMap data={params} />
      </GGMap>
    );
  }, [params]);

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      backgroundBody={Colors.yellowHalfDutchWhite}>
      <View style={styles.infoWrapper}></View>
      <ScrollView>{renderMap()}</ScrollView>
    </Container>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  infoWrapper: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
