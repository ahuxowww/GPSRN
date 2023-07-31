import React from 'react';
import {Colors} from '../../assets';
import {Text, View} from 'react-native-ui-lib';
import BottomSheetDetails from './components/BottomSheetDetails';

const SettingScreen = () => {
  return (
    <View flex>
      <View backgroundColor={Colors.redAlizarin}></View>
      <BottomSheetDetails totalKm={101} totalMinutes={20} />
    </View>

  );
};

export default SettingScreen;
