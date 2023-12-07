import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Container from '../component/Container';
import {GGMap} from './component/GGMap';
import {Colors, Metrics, Svgs} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import MainTitle from '../component/MainTitle';
import Carousel from 'react-native-snap-carousel';
import Text from '../component/common/Text';
import {firebase} from '@src/config/firebaseconfig';
import {LoadingView} from '../component/common/LoadingView';
import {useNavigation} from '@react-navigation/native';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeoPoint {
  lat: number;
  lng: number;
}

interface Geometry {
  location: GeoPoint;
  location_type: string;
  viewport: {
    northeast: GeoPoint;
    southwest: GeoPoint;
  };
}

interface AddressFromGeoResult {
  plus_code: PlusCode;
  results: AddressResult[];
  status: string;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface AddressResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code: PlusCode;
  types: string[];
}

const EventRegistration = () => {
  const [loading, setLoading] = useState(true);
  const [journey, setJourney] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [journeys, setJourneys] = useState([]);
  const refCarousel = React.useRef<Carousel<any>>(null);
  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection('journey')
      .get()
      .then(result => result.docs)
      .then(docs =>
        docs.map(doc => ({
          id: doc.id,
          my_journey: doc.data().my_journey,
          distance: doc.data().distance,
          method: doc.data().method,
          start_time: doc.data().start_time,
          end_time: doc.data().end_time,
        })),
      )
      .then(data => {
        setJourneys(data);
        setJourney(data[0]);
        setLoading(false);
      });
  }, []);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <Svgs.Car width={32} height={32} fill={Colors.white} />;
      case 'bike':
        return <Svgs.Bike width={32} height={32} fill={Colors.white} />;
      case 'motor':
        return <Svgs.Motor width={32} height={32} fill={Colors.white} />;
      case 'walk':
        return <Svgs.Walk width={32} height={32} fill={Colors.white} />;
      default:
        return <Svgs.Motor width={32} height={32} fill={Colors.white} />;
    }
  };

  const renderMap = useCallback((trip: any) => {
    return <GGMap data={trip ?? []}></GGMap>;
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
      const onChangeVehicle = () => {
        navigation.navigate('SELECT_VEHICLE_SCREEN', {index: index});
      };
      return (
        <View style={styles.itemJourney} key={index}>
          <View spread row style={styles.headerItem}>
            <View center row>
              <Text color={Colors.white} body_bold>
                Phương tiện :{' '}
              </Text>
              {renderIcon(item.method)}
            </View>
            <TouchableOpacity onPress={onChangeVehicle} center>
              <Text color={Colors.white} body_bold>
                Thay đổi ?{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View marginT-16>
            <Text color={Colors.white} body_regular>
              Quãng đường : {item.distance ?? 0} m
            </Text>
            <Text color={Colors.white} body_regular>
              Thời gian : {`${item.start_time} - ${item.end_time}`}
            </Text>
          </View>
        </View>
      );
    },
    [],
  );

  const handleScroll = useCallback(
    (index: number) => {
      if (index !== currentItemIndex) {
        setCurrentItemIndex(index);
        setJourney(journeys[index]);
      }
    },
    [currentItemIndex, journeys],
  );

  console.log(journeys.length);
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      backgroundBody={Colors.yellowHalfDutchWhite}>
      <MainTitle marginH-24 title="Hành trình" />
      <ScrollView style={styles.flex}>
        {loading ? (
          <LoadingView />
        ) : (
          <>
            {renderMap([journey])}
            {journeys.length === 0 ? (
              <>
                <View style={styles.position}>
                  <View style={styles.noJourney}>
                    <Text body_bold color={Colors.whiteSmoke}>
                      Bạn chưa có hành trình nào. Nhấn Icon play để bắt đầu khởi
                      hành ngay nào.🥰{' '}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.position}>
                <Carousel
                  disableIntervalMomentum
                  ref={refCarousel}
                  data={journeys}
                  itemWidth={Metrics.screen.width - 60}
                  renderItem={renderItem}
                  sliderWidth={Metrics.screen.width}
                  slideStyle={styles.slideStyle}
                  getItemLayout={getItemLayout}
                  initialNumToRender={5}
                  windowSize={5}
                  onBeforeSnapToItem={handleScroll}
                  containerCustomStyle={styles.flexGrow}
                  style={styles.position}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default EventRegistration;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
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
    paddingHorizontal: 32,
  },
  slideStyle: {
    height: 200,
    justifyContent: 'flex-end',
  },
  headerItem: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  noJourney: {
    height: 100,
    backgroundColor: Colors.goldenBrown,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
  },
});
