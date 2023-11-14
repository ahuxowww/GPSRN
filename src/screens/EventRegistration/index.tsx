import React, {useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Container from '../component/Container';
import {GGMap} from './component/GGMap';
import {Colors, Metrics, Svgs} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import MainTitle from '../component/MainTitle';
import Carousel from 'react-native-snap-carousel';
import Text from '../component/common/Text';
import {LineCoord} from '../Announcement/component/inteface';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import {LocationRedux} from '@src/redux/reducers';
import R from 'ramda';

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
  const mockData = [
    {
      method: 'car',
      journey: [
        [
          {
            latitude: 59.7437818026415,
            longitude: 10.207861458330587,
          },
          {
            latitude: 59.743045840988124,
            longitude: 10.207617667318129,
          },
          {
            latitude: 59.742685088649885,
            longitude: 10.20742854992613,
          },
          {
            latitude: 59.74231097413829,
            longitude: 10.20714592119543,
          },
          {
            latitude: 59.741972491648106,
            longitude: 10.207488330616853,
          },
          {
            latitude: 59.741767532080836,
            longitude: 10.208133017810368,
          },
          {
            latitude: 59.74155613092342,
            longitude: 10.208827855807241,
          },
          {
            latitude: 59.74138685528658,
            longitude: 10.209523301904186,
          },
          {
            latitude: 59.7412429636569,
            longitude: 10.210199521012912,
          },
          {
            latitude: 59.74108067668642,
            longitude: 10.210946327477645,
          },
          {
            latitude: 59.74094262725213,
            longitude: 10.21161014822291,
          },
          {
            latitude: 59.74078787703685,
            longitude: 10.212348464173022,
          },
          {
            latitude: 59.74066352985377,
            longitude: 10.213026088400166,
          },
          {
            latitude: 59.74054668883495,
            longitude: 10.213801780676855,
          },
          {
            latitude: 59.740487522616625,
            longitude: 10.214575427244261,
          },
          {
            latitude: 59.74048098521942,
            longitude: 10.215287028650238,
          },
          {
            latitude: 59.74048909382099,
            longitude: 10.216107028837389,
          },
          {
            latitude: 59.74046064186398,
            longitude: 10.216820464544002,
          },
          {
            latitude: 59.74044174739638,
            longitude: 10.217649577553573,
          },
          {
            latitude: 59.740427221415366,
            longitude: 10.21844609074089,
          },
          {
            latitude: 59.74031745566848,
            longitude: 10.219185531449149,
          },
          {
            latitude: 59.73997029758835,
            longitude: 10.219450928350486,
          },
          {
            latitude: 59.73957825588185,
            longitude: 10.219380840020367,
          },
          {
            latitude: 59.73918331782981,
            longitude: 10.219304372863597,
          },
          {
            latitude: 59.738811537565525,
            longitude: 10.219226482425322,
          },
          {
            latitude: 59.738431182439534,
            longitude: 10.2191435240312,
          },
          {
            latitude: 59.73805889859749,
            longitude: 10.21905906771932,
          },
          {
            latitude: 59.73775039735333,
            longitude: 10.218661355032202,
          },
          {
            latitude: 59.737383123815874,
            longitude: 10.218648218047711,
          },
          {
            latitude: 59.73712274913232,
            longitude: 10.218101645405339,
          },
          {
            latitude: 59.73705686020849,
            longitude: 10.217360026291248,
          },
          {
            latitude: 59.73700747434792,
            longitude: 10.216642982623803,
          },
          {
            latitude: 59.73696282518598,
            longitude: 10.215890751692513,
          },
          {
            latitude: 59.73691376524843,
            longitude: 10.215178497079323,
          },
          {
            latitude: 59.73686386834688,
            longitude: 10.214432981714529,
          },
          {
            latitude: 59.73681023561299,
            longitude: 10.213654688086569,
          },
          {
            latitude: 59.736761830514915,
            longitude: 10.212895271259715,
          },
          {
            latitude: 59.73668249292951,
            longitude: 10.212181789202873,
          },
          {
            latitude: 59.73646617634262,
            longitude: 10.211545411716243,
          },
          {
            latitude: 59.73612802135537,
            longitude: 10.2111323793796,
          },
          {
            latitude: 59.73580828110128,
            longitude: 10.210782205985822,
          },
          {
            latitude: 59.73547480500519,
            longitude: 10.210487480494221,
          },
          {
            latitude: 59.735121660137274,
            longitude: 10.210130533787094,
          },
          {
            latitude: 59.73475988488113,
            longitude: 10.209789761943908,
          },
          {
            latitude: 59.73440445556924,
            longitude: 10.209417044722167,
          },
          {
            latitude: 59.734235799069495,
            longitude: 10.208773334380123,
          },
          {
            latitude: 59.73444277760372,
            longitude: 10.208161816256984,
          },
          {
            latitude: 59.7346721767793,
            longitude: 10.207554761172533,
          },
          {
            latitude: 59.73490335120229,
            longitude: 10.206928954975693,
          },
          {
            latitude: 59.73508395484334,
            longitude: 10.20651415477177,
          },
          {
            latitude: 59.73491881050498,
            longitude: 10.206215188291335,
          },
          {
            latitude: 59.73482650660886,
            longitude: 10.205817455113756,
          },
          {
            latitude: 59.734549508301626,
            longitude: 10.205347125913018,
          },
          {
            latitude: 59.73420885302316,
            longitude: 10.2063330682765,
          },
          {
            latitude: 59.73433816430284,
            longitude: 10.206707167043756,
          },
          {
            latitude: 59.73505153526236,
            longitude: 10.20563438222574,
          },
          {
            latitude: 59.73509069028201,
            longitude: 10.205456508362948,
          },
          {
            latitude: 59.7351807304289,
            longitude: 10.205843679288954,
          },
          {
            latitude: 59.73378119491962,
            longitude: 10.206987820463235,
          },
          {
            latitude: 59.73358657870493,
            longitude: 10.207675738716485,
          },
          {
            latitude: 59.733363432310774,
            longitude: 10.208339886451038,
          },
          {
            latitude: 59.733252270250745,
            longitude: 10.209020181493315,
          },
          {
            latitude: 59.73352005287672,
            longitude: 10.209502908657479,
          },
          {
            latitude: 59.73339835284191,
            longitude: 10.210223490114613,
          },
          {
            latitude: 59.733211472503484,
            longitude: 10.210877428997305,
          },
          {
            latitude: 59.732975072005246,
            longitude: 10.211529600217277,
          },
          {
            latitude: 59.732748514430945,
            longitude: 10.21219492107198,
          },
          {
            latitude: 59.73237142435647,
            longitude: 10.211905605522386,
          },
        ],
      ],
      time: 50,
    },
  ];

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

  const locationData = useSelector(
    R.pipe(LocationRedux.getReducerState, LocationRedux.selectors.getLocation),
  );

  const renderMap = useCallback(() => {
    return (
      <GGMap>
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
          <View spread row style={styles.headerItem}>
            <View center row>
              <Text color={Colors.white} body_bold>
                Phương tiện :{' '}
              </Text>
              {renderIcon(item.method)}
            </View>
            <TouchableOpacity onPress={() => {}} center>
              <Text color={Colors.white} body_bold>
                Thay đổi ?{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View marginT-16>
            <Text color={Colors.white} body_regular>
              Tốc độ trung bình :{' '}
            </Text>
            <Text color={Colors.white} body_regular>
              Quãng đường :{' '}
            </Text>
            <Text color={Colors.white} body_regular>
              Thời gian :{' '}
            </Text>
            <Text color={Colors.white} body_regular>
              Địa chỉ :{' '}
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
      <MainTitle marginH-24 title="Hành trình" />
      <ScrollView style={styles.flex}>
        {renderMap()}
        <View style={styles.position}>
          <Carousel
            disableIntervalMomentum
            data={mockData}
            itemWidth={Metrics.screen.width - 60}
            renderItem={renderItem}
            sliderWidth={Metrics.screen.width}
            slideStyle={styles.slideStyle}
            getItemLayout={getItemLayout}
            initialNumToRender={5}
            windowSize={5}
            containerCustomStyle={styles.flexGrow}
            style={styles.position}
          />
        </View>
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
});
