import {Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

export default {
  screen: {
    width,
    height,
  },
  isTablet: isTablet(),
};
