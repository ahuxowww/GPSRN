import React, {useEffect, useState} from 'react';
import Container from '../component/Container';
import {Colors} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import Text from '../component/common/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {getDisplayDuration} from '@src/ui/utilities/timeUtilities';
import {differenceInSeconds} from 'date-fns';
import {useRoute} from '@react-navigation/native';

const useDurationTimer = (startTime?: Date) => {
  const [duration, setDuration] = React.useState('00:00:00');
  React.useEffect(() => {
    // reset the timer if no journey is running
    if (!startTime) {
      setDuration('00:00:00');
      return;
    }

    const timer = setTimeout(() => {
      const secondsDiff = differenceInSeconds(new Date(), startTime);
      setDuration(getDisplayDuration(secondsDiff));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [startTime]);

  return duration;
};

const CreateJourney = () => {
  const {params}: any = useRoute();
  const startTime = params.startTime;
  const [duration, setDuration] = useState('00:00:00');
  const [routePoints, setRoutePoint] = useState([]);

  useEffect(() => {
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
      setInterval(timer);
    };
  }, [startTime]);

  return (
    <Container
      safeBottom
      backgroundColor={'#485583'}
      barStyle="dark-content"
      backgroundBody={'#485583'}>
      <View center marginT-60>
        <View center row paddingH-30 paddingB-15>
          <MaterialCommunityIcons
            name="arrow-left"
            style={styles.arrowLeft}
            onPress={() => {}}
          />
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
        <TouchableOpacity marginT-24 onPress={() => {}}>
          <MaterialCommunityIcons
            name="close-circle-outline"
            style={styles.iconClose}
          />
        </TouchableOpacity>
      </View>
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
});
export default CreateJourney;
