import {ScrollView} from 'react-native';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {Colors} from '../../assets';
import {Text, View} from 'react-native-ui-lib';

const MyPageScreen = () => {
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.white}>
      <MainTitle marginH-24 title="Me" />
      <ScrollView>
        <View height={1000} backgroundColor={Colors.white}></View>
      </ScrollView>
    </Container>
  );
};

export default MyPageScreen;
