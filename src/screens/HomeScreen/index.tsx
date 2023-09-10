import React, {useState, useCallback, useEffect} from 'react';
import {ScrollView, PermissionsAndroid} from 'react-native';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {Colors} from '../../assets';
import {TabBar} from '../component/common/TabBar';
import {TagItem} from './components/TagItem';
import {View} from 'react-native-ui-lib';
const tabList = [
  {label: 'Tất cả', status: 0},
  {label: 'Online', status: 1},
  {label: 'Ofline', status: 2},
];

const allVehicle = [
  {label: 'Xe số 1', subTitle: 'Tạm dừng', time: '4:00 h', type: 'car'},
  {label: 'Xe số 2', subTitle: 'Online', time: '2:00 h', type: 'bike'},
  {label: 'Xe số 3', subTitle: 'Tạm dừng', time: '4:00 h', type: 'walk'},
  {label: 'Xe số 4', subTitle: 'GPS yếu', time: '', type: 'motor'},
];

const activeVehicle = [
  {label: 'Xe số 2', subTitle: 'Online', time: '2:00 h', type: 'bike'},
  {label: 'Xe số 4', subTitle: 'GPS yếu', time: '', type: 'motor'},
];

const offlineVehicle = [
  {label: 'Xe số 1', subTitle: 'Tạm dừng', time: '4:00 h', type: 'car'},
  {label: 'Xe số 3', subTitle: 'Tạm dừng', time: '4:00 h', type: 'walk'},
];

const HomeScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const onChangeType = useCallback((index: number) => {
    // ref?.current?.scrollTo({
    //   x: 0,
    //   y: 0,
    //   animated: true,
    // });
    setTabIndex(index);
  }, []);

  const onNavtoMapScreen = useCallback(() => {}, []);

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.white}>
      <MainTitle marginH-24 title="Tài khoản" />
      <TabBar
        indexSelected={tabIndex}
        setIndexSelected={onChangeType}
        tabList={tabList}
      />
      <ScrollView>
        {tabIndex === 0
          ? allVehicle.map((item: any) => (
              <TagItem
                title={item.label}
                subTitle={item.subTitle}
                type={item.type}
                onPress={onNavtoMapScreen}
              />
            ))
          : tabIndex === 1
          ? activeVehicle.map((item: any) => (
              <TagItem
                title={item.label}
                subTitle={item.subTitle}
                type={item.type}
                onPress={onNavtoMapScreen}
              />
            ))
          : tabIndex === 2
          ? offlineVehicle.map((item: any) => (
              <TagItem
                title={item.label}
                subTitle={item.subTitle}
                type={item.type}
                onPress={onNavtoMapScreen}
              />
            ))
          : null}
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
