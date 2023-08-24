import React from 'react';
import {Colors} from '../../assets';
import {Text, View} from 'react-native-ui-lib';
import BottomSheetDetails from './components/BottomSheetDetails';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';

const SettingScreen = () => {
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.white}>
      <MainTitle isgoBack marginH-24 title="Cài đặt" />
      <BottomSheetDetails totalKm={101} totalMinutes={20} />
    </Container>
  );
};

export default SettingScreen;
