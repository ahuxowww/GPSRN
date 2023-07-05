import {Image, ScrollView, StyleSheet} from 'react-native';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {Colors, Images} from '../../assets';
import {View} from 'react-native-ui-lib';
import SevenSegmentDisplay, {segmentMap} from 'rn-seven-segment-display';
import {useEffect} from 'react';
import Text from '../component/common/Text';

const EventRegistration = () => {
  const mockData = {
    value: 30,
    total: 2156,
    safe: true,
  };
  let valueSpeed = mockData?.value.toString();
  if (valueSpeed.length === 1) {
    valueSpeed = '00' + valueSpeed;
  } else if (valueSpeed.length === 2) {
    valueSpeed = '0' + valueSpeed;
  }

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      backgroundBody={Colors.yellowHalfDutchWhite}>
      <MainTitle marginH-24 title="Start" />
      <ScrollView>
      <Text marginT-40 marginB-16 marginH-24 h_page_title color={Colors.greyNightRider71}>Vận tốc của xe</Text>
        <View row center>
          {valueSpeed.split('').map((value, index) => {
            return (
              <SevenSegmentDisplay
                offColor={Colors.orangeBrown}
                onColor={Colors.blueNavy}
                height={36}
                width={36}
                key={index}
                value={value}
              />
            );
          })}
        </View>
        <View
          marginT-24
          marginH-24
          row
          style={{justifyContent: 'space-between'}}>
          <View>
            <Text marginB-8 body_bold color={Colors.greyNightRider71}>Đồng hồ đo quãng đường</Text>
            <View row style={{alignItems: 'flex-end'}}>
              {mockData?.total
                .toString()
                .split('')
                .map((value, index) => {
                  return (
                    <SevenSegmentDisplay
                      offColor={Colors.orangeBrown}
                      onColor={Colors.blueNavy}
                      height={8}
                      width={8}
                      key={index}
                      value={value}
                    />
                  );
                })}
              <Text marginB-4 color={Colors.blueNavy}>KM</Text>
            </View>
          </View>
          <Text h1 style={{alignItems: 'center'}} color={Colors.blueNavy}>KM/H</Text>
        </View>
        <View marginH-24 marginT-16>
          <Text body_bold color={Colors.greyNightRider71}>Tình trạng của xe</Text>
          <Text marginT-8 body_regular color={mockData.safe ? Colors.greenPigment : Colors.redAlizarin}>{mockData.safe ? 'AN TOÀN' : 'NGUY HIỂM'}</Text>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 52,
    width: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: Colors.greyNightRider57,
  },
});

export default EventRegistration;
