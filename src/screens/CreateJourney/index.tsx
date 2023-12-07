import React, {useCallback, useEffect, useState} from 'react';
import Container from '../component/Container';
import {Colors, Svgs} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import Text from '../component/common/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {getDisplayDuration} from '@src/ui/utilities/timeUtilities';
import {differenceInSeconds, format} from 'date-fns';
import {useRoute} from '@react-navigation/native';
import {firebase} from '@src/config/firebaseconfig';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {LocationRedux} from '@src/redux/reducers';
import R from 'ramda';
import * as Geolib from 'geolib';
import {DialogLib} from '../component/common/DialogLib';
import {ButtonText} from '../component/common/ButtonText';
import {useVehicle} from '@src/hooks/vehicle';

const CreateJourney = () => {
  const {params}: any = useRoute();
  const startTime = params.startTime;
  const [isVisible, setVisible] = React.useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [routePoints, setRoutePoint] = useState([]);
  const navigation = useNavigation();
  const {getVehicle} = useVehicle();
  const location = useSelector(
    R.pipe(LocationRedux.getReducerState, LocationRedux.selectors.getLocation),
  );
  const [lastLocation, setLastLocation] = useState(location);
  const [totalDistance, setTotalDistance] = useState(0);
  useEffect(() => {
    console.log('Start useEffect');

    // reset the timer if no journey is running
    if (!startTime) {
      setDuration('00:00:00');
      return;
    }

    const timer = setInterval(() => {
      const secondsDiff = differenceInSeconds(new Date(), startTime);
      setDuration(getDisplayDuration(secondsDiff));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startTime]);
  console.log(routePoints, lastLocation, routePoints.length);

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = Geolib.getDistance(
        {
          latitude: lastLocation.f_latitude,
          longitude: lastLocation.f_longitude,
        },
        {
          latitude: location.f_latitude,
          longitude: location.f_longitude,
        },
      );
      setTotalDistance(distance + totalDistance);
      setRoutePoint(prevItems => [
        ...prevItems,
        {
          latitude: location.f_latitude,
          longitude: location.f_longitude,
        },
      ]);
      setLastLocation(location);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [
    lastLocation.f_latitude,
    lastLocation.f_longitude,
    location,
    startTime,
    totalDistance,
  ]);

  const onAddJourney = useCallback(() => {
    if (!routePoints || !startTime) {
      return;
    }
    firebase
      .firestore()
      .collection('journey')
      .add({
        distance: totalDistance,
        start_time: format(startTime, 'yyyy-MM-dd HH:mm'),
        method: getVehicle,
        my_journey: routePoints,
        end_time: format(new Date(), 'yyyy-MM-dd HH:mm'),
      });
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
      .then(data => {});
    setDuration('00:00:00');
    navigation.goBack();
  }, [navigation, routePoints, startTime, totalDistance]);

  const onCloseDialogAbortJourney = React.useCallback(() => {
    setVisible(false);
  }, []);

  const onOpenDialogAbortJourney = React.useCallback(() => {
    setVisible(true);
  }, []);

  const onDeleteJourney = React.useCallback(() => {
    navigation.goBack();
    setDuration('00:00:00');
  }, [navigation]);

  return (
    <Container
      safeBottom
      backgroundColor={'#485583'}
      barStyle="dark-content"
      backgroundBody={'#485583'}>
      <View center marginT-60>
        <View center row paddingH-30 paddingB-15>
          <Svgs.Back fill={Colors.white} />
          <Text color={Colors.white} h_highlight>
            Back
          </Text>
        </View>
        <View center marginT-24>
          <Text marginT-8 color={Colors.white} h_highlight>
            Hành trình đang bắt đầu :))
          </Text>
          <Text marginT-8 color={Colors.white} body_bold>
            {`Thời gian: ${duration}`}
          </Text>
          <Text marginT-8 color={Colors.white} body_bold>
            Quãng đường:
          </Text>
        </View>
        <TouchableOpacity center marginT-24 onPress={onOpenDialogAbortJourney}>
          <Svgs.Close fill={Colors.white} />
          <Text marginT-8 color={Colors.white} body_bold>
            Dừng
          </Text>
        </TouchableOpacity>
      </View>
      <DialogLib
        visible={isVisible}
        description={'Bạn muốn kết thúc hành trình'}
        onClose={onCloseDialogAbortJourney}>
        <View row spread marginB-16 marginH-24>
          <ButtonText
            label={'Lưu'}
            styleText={styles.styleTextButton}
            onPress={onAddJourney}
          />
          <View row>
            <ButtonText
              label={'Xóa'}
              styleText={styles.buttonDeleteDialog}
              onPress={onDeleteJourney}
            />
            <ButtonText
              label={'Tiếp tục'}
              styleText={styles.buttonDeleteDialog}
              onPress={onCloseDialogAbortJourney}
            />
          </View>
        </View>
      </DialogLib>
    </Container>
  );
};

const styles = StyleSheet.create({
  arrowLeft: {
    color: Colors.white,
    fontSize: 30,
    marginBottom: -2,
    marginLeft: -15,
    zIndex: 99,
  },
  iconClose: {
    color: Colors.white,
    fontSize: 30,
  },
  styleTextButton: {
    fontSize: 14,
    color: Colors.blueDark,
  },
  buttonDeleteDialog: {
    color: Colors.redAlizarin,
    fontSize: 14,
  },
});
export default CreateJourney;
