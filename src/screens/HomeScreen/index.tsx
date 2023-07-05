import {Image, ScrollView, StyleSheet} from 'react-native';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {Colors, Images, Metrics} from '../../assets';
import {View} from 'react-native-ui-lib';
import Text from '../component/common/Text';
import Svgs from '../../assets/svg';

const HomeScreen = () => {
  const mockData = {
    avatar: '',
    name: 'Mai Nhat',
    times: 12,
    total: 3.2,
  };

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="light-content"
      backgroundBody={Colors.yellowHalfDutchWhite}>
      <MainTitle marginH-24 title="Me" />
      <ScrollView>
        <View row centerV marginT-24 marginH-24>
          <Image
            source={mockData.avatar ? mockData.avatar : Images.logo.avatar}
            style={styles.avatar}
          />
          <Text marginL-32 h_page_title>
            {mockData?.name}
          </Text>
        </View>
        <View row marginT-16>
          <View marginL-16 style={styles.subContent}>
            <Text body_bold>{mockData.total}</Text>
            <Text body_regular>Total (km) {mockData?.total ? '🤗' : '😴'}</Text>
          </View>
          <View marginL-16 style={styles.subContent}>
            <Text body_bold>{mockData?.times}</Text>
            <Text body_regular>Higher speed</Text>
          </View>
          <View marginL-16 style={styles.subContent}>
            <Text body_bold>0</Text>
            <Text body_regular>To do</Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    resizeMode: 'cover',
    borderColor: Colors.greyNightRider57,
  },
  subContent: {
    width: (Metrics.screen.width - 48) / 3,
    borderRightWidth: 1,
    borderColor: Colors.greyNightRider57,
  },
});
export default HomeScreen;
