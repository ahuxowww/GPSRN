import React, {useCallback, useState} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import Container from '../component/Container';
import {GGMap} from './component/GGMap';
import {Colors, Images, Metrics, Svgs} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import MainTitle from '../component/MainTitle';
import Carousel from 'react-native-snap-carousel';
import Text from '../component/common/Text';
import {useSelector} from 'react-redux';
import {LocationRedux} from '@src/redux/reducers';
import R from 'ramda';
import {useVehicle} from '@src/hooks/vehicle';

const Map = () => {
  const status = [
    {label: 'An toàn', status: 1},
    {label: 'Nguy hiểm', status: 2},
  ];
  const location = useSelector(
    R.pipe(LocationRedux.getReducerState, LocationRedux.selectors.getLocation),
  );

  const [bottomMapDialog, setBottomMapDialog] = useState(false);
  const {getVehicle} = useVehicle();
  const renderMap = useCallback(() => {
    const data = {
      location: {
        lat: location?.f_latitude,
        lon: location?.f_longitude,
      },
    };
    return <GGMap data={data}></GGMap>;
  }, []);

  const MinDangerSpeed = getVehicle === 'car' ? 60 : 40;

  const mockData = [
    {
      title: 'Tốc độ',
      value: (location.f_speed ?? 0).toFixed(2),
      type: 'km/h',
    },
    {
      title: 'Tình trạng',
      value: status[location?.f_speed > MinDangerSpeed ? 1 : 0].label,
      type: '',
      color: 'green',
    },
  ];

  const onOpenBottomDetail = useCallback(() => {
    setBottomMapDialog(false);
  }, []);
  const onCloseBottomDetail = useCallback(() => {
    setBottomMapDialog(true);
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
          <View
            row
            style={[styles.headerItem, {justifyContent: 'space-between'}]}>
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

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      backgroundBody={Colors.yellowHalfDutchWhite}>
      <MainTitle marginH-24 title="Vị trí" />
      <ScrollView style={{flex: 1}}>
        {renderMap()}
        {getVehicle ? (
          !bottomMapDialog ? (
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
          ) : (
            <TouchableOpacity
              onPress={onOpenBottomDetail}
              style={[styles.position, {left: 16}]}>
              <Image source={Images.logo.arrow_top} style={styles.image} />
            </TouchableOpacity>
          )
        ) : (
          <View
            center
            width={Metrics.screen.width}
            flex
            style={styles.position}>
            <View flex style={styles.noJourney}>
              <Text body_bold color={Colors.whiteSmoke}>
                Bạn chưa chọn xe theo dõi. 🥰{' '}
              </Text>
            </View>
          </View>
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
  headerItem: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  noJourney: {
    height: 100,
    backgroundColor: Colors.goldenBrown,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
  },
});
