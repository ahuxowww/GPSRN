import React, {useCallback, useEffect, useState} from 'react';
import Container from '../component/Container';
import {Colors, Svgs} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import Text from '../component/common/Text';
import {StyleSheet} from 'react-native';
import {getDisplayDuration} from '@src/ui/utilities/timeUtilities';
import {differenceInSeconds, format} from 'date-fns';
import {useRoute} from '@react-navigation/native';
import {firebase} from '@src/config/firebaseconfig';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {LocationRedux} from '@src/redux/reducers';
import R from 'ramda';
import * as Geolib from 'geolib';
import {DialogLib} from '../component/common/DialogLib';
import {ButtonText} from '../component/common/ButtonText';
import {useVehicle} from '@src/hooks/vehicle';
import {actions} from '@src/redux/vehicle/VehicleActions';
import {AppThunkDispatch} from '@src/redux/common';

const CreateJourney = () => {
  const {params}: any = useRoute();
  const startTime = params.startTime;
  const [isVisible, setVisible] = React.useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [routePoints, setRoutePoint] = useState([]);
  const navigation = useNavigation();
  const location = useSelector(
    R.pipe(LocationRedux.getReducerState, LocationRedux.selectors.getLocation),
  );
  const [lastLocation, setLastLocation] = useState(location);
  const [totalDistance, setTotalDistance] = useState(0);
  const dispatch = useDispatch<AppThunkDispatch>();
  const {getActiveJourney, getVehicle} = useVehicle();

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
    dispatch(actions.setStartJourney({active: false}));

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
  }, [dispatch, getVehicle, navigation, routePoints, startTime, totalDistance]);

  useEffect(() => {
    if (getActiveJourney) {
      // Biến để theo dõi số lần kiểm tra
      let checkCount = 0;

      // Hàm kiểm tra từ API Realtime
      const checkSpeed = async () => {
        try {
          // Kiểm tra nếu vận tốc < 10, thì tăng biến đếm
          if (location?.f_speed < 10) {
            checkCount++;
            console.log('Vận tốc thấp - Lần kiểm tra thứ', checkCount);
          } else {
            console.log('Vận tốc OK - Lần kiểm tra thứ', checkCount);
          }

          // Nếu đã kiểm tra 60 lần (5 giây * 12 lần), dừng kiểm tra
          if (checkCount >= 3) {
            onAddJourney();
            console.log('Dừng hành trình vì vận tốc thấp liên tục.');
            // Gọi hàm dừng hành trình ở đây (tuỳ thuộc vào cách bạn quản lý hành trình)
          } else {
            // Nếu chưa kiểm tra đủ số lần, thì tiếp tục kiểm tra sau 5 giây
            setTimeout(checkSpeed, 5000);
          }
        } catch (error) {
          console.error('Lỗi khi kiểm tra vận tốc:', error);
        }
      };

      // Gọi hàm kiểm tra đầu tiên
      checkSpeed();
    }
  }, [getActiveJourney, location?.f_speed, onAddJourney]); // Empty dependency array means this effect runs once when the component mounts

  const onCloseDialogAbortJourney = React.useCallback(() => {
    setVisible(false);
  }, []);

  const onOpenDialogAbortJourney = React.useCallback(() => {
    setVisible(true);
  }, []);

  const onDeleteJourney = React.useCallback(() => {
    dispatch(actions.setStartJourney({active: false}));
    navigation.goBack();
    setDuration('00:00:00');
  }, [dispatch, navigation]);

  return (
    <Container
      safeBottom
      backgroundColor={'#485583'}
      barStyle="dark-content"
      backgroundBody={'#485583'}>
      <View center marginT-60>
        <TouchableOpacity
          center
          row
          paddingH-30
          paddingB-15
          onPress={onOpenDialogAbortJourney}>
          <Svgs.Back fill={Colors.white} />
          <Text color={Colors.white} h_highlight>
            Back
          </Text>
        </TouchableOpacity>
        <View center marginT-24>
          <Text marginT-8 color={Colors.white} h_highlight>
            Hành trình đang bắt đầu :))
          </Text>
          <Text marginT-8 color={Colors.white} body_bold>
            {`Thời gian: ${duration}`}
          </Text>
          <Text marginT-8 color={Colors.white} body_bold>
            {` Quãng đường: ${totalDistance} m`}
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
