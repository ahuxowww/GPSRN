import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, PermissionsAndroid} from 'react-native';
import Container from '../component/Container';
import {GGMap} from './component/GGMap';
import {Marker} from './component/Marker';
import {Colors, Images, Metrics, Svgs} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import MainTitle from '../component/MainTitle';
import Carousel from 'react-native-snap-carousel';
import Text from '../component/common/Text';
import {useUserLogin} from '@src/hooks/user';

const Map = () => {
  const {followUser} = useUserLogin();

  const status = [
    {label: 'An toàn', status: 1},
    {label: 'Nguy hiểm', status: 2},
  ];

  const [bottomMapDialog, setBottomMapDialog] = useState(false);
  // const { userMapName } = useUserProfile();

  const renderMap = useCallback(() => {
    const data = {
      location: {
        lat: 21.035688,
        lon: 105.851564,
      },
    };
    return (
      <GGMap data={data}>
        {/* <Marker
          isGGMap
          data={{
            location: {
              lat: 21.035688,
              lon: 105.851564,
            },
          }}
        /> */}
      </GGMap>
    );
  }, []);

  const mockData = [
    {title: 'Tốc độ', value: '37.2', type: 'km/h'},
    {title: 'Quãng đường đi đến xe của bạn', value: '32', type: 'km'},
    {title: 'Tình trạng', value: 'An Toàn', type: '', color: 'green'},
  ];

  const onOpenBottomDetail = useCallback(() => {
    setBottomMapDialog(true);
  }, []);
  const onCloseBottomDetail = useCallback(() => {
    setBottomMapDialog(false);
  }, []);
  const ITEM_LENGTH = Metrics.screen.width - 60;

  const getItemLayout = React.useCallback(
    (_data: any, index: number) => ({
      length: ITEM_LENGTH,
      offset: ITEM_LENGTH * index,
      index,
    }),
    [ITEM_LENGTH],
  );

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <View style={styles.itemJourney}>
          <View row style={{justifyContent: 'space-between'}}>
            <View flex>
              <Text h2 color={Colors.white}>
                {item.title}
              </Text>
            </View>
            <TouchableOpacity onPress={onCloseBottomDetail}>
              <Svgs.Close width={24} height={24} fill={Colors.white} />
            </TouchableOpacity>
          </View>
          <View center row marginT-12>
            <Text
              h1
              color={
                item?.color
                  ? item?.color === 'green'
                    ? Colors.greenSpringBud
                    : Colors.redAlizarin
                  : Colors.white
              }>
              {item?.value} {item?.type}
            </Text>
          </View>
        </View>
      );
    },
    [],
  );

  useEffect(() => {
    !followUser &&
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ]);
  }, [followUser]);

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      backgroundBody={Colors.yellowHalfDutchWhite}>
      <MainTitle marginH-24 title="Vị trí" />
      <ScrollView style={{flex: 1}}>
        {renderMap()}
        {bottomMapDialog && (
          <View style={styles.position}>
            <Carousel
              disableIntervalMomentum
              // ref={refCarousel}
              data={mockData}
              itemWidth={Metrics.screen.width - 60}
              renderItem={renderItem}
              sliderWidth={Metrics.screen.width}
              slideStyle={{height: 200, justifyContent: 'flex-end'}}
              getItemLayout={getItemLayout}
              initialNumToRender={5}
              windowSize={5} // lazyload only render prev and next item ( should equal to initialNumToRender )
              containerCustomStyle={{flexGrow: 0}}
              style={styles.position}
            />
          </View>
        )}
        {!bottomMapDialog && (
          <TouchableOpacity
            onPress={onOpenBottomDetail}
            style={[styles.position, {left: 16}]}>
            <Image source={Images.logo.arrow_top} style={styles.image} />
          </TouchableOpacity>
        )}
      </ScrollView>
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
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  itemJourney: {
    height: 200,
    backgroundColor: Colors.blueDarkTurquoise,
    borderRadius: 16,
    padding: 16,
  },
});
