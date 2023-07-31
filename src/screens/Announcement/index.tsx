import React, {useCallback, useState} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import Container from '../component/Container';
import {GGMap} from './component/GGMap';
import {Marker} from './component/Marker';
import {Colors, Images} from '../../assets';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import MainTitle from '../component/MainTitle';
import {BottomDialog} from '../component/common/BottomDialog';

const Map = () => {
  const status = [
    {label: 'An toàn', status: 1},
    {label: 'Nguy hiểm', status: 2},
  ];

  const [bottomMapDialog, setBottomMapDialog] = useState(false);
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

    const data = {
      location: {
        lat: 21.035688,
        lon: 105.851564,
      },
    };
    return (
      <GGMap data={data}>
        <Marker
          isGGMap
          data={{
            location: {
              lat: 21.035688,
              lon: 105.851564,
            },
          }}
        />
      </GGMap>
    );
  }, []);
  const actionMotor = 1;

  const onOpenBottomDetail = useCallback(() => {
    setBottomMapDialog(true);
  }, []);
  const onCloseBottomDetail = useCallback(() => {
    setBottomMapDialog(false);
  }, []);
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      backgroundBody={Colors.yellowHalfDutchWhite}>
      <MainTitle marginH-24 title="Vị trí" />
      <ScrollView style={{flex: 1}}>
        {renderMap()}
        <TouchableOpacity onPress={onOpenBottomDetail} style={styles.position}>
          <Image source={Images.logo.arrow_top} style={styles.image} />
        </TouchableOpacity>
      </ScrollView>
      <BottomDialog
        customTitle="Chi tiết bản đồ"
        isVisible={bottomMapDialog}
        onCloseModal={onCloseBottomDetail}>
        <View padding-16 height={100}></View>
      </BottomDialog>
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
  position: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
});
