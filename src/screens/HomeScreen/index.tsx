import React, {useState, useCallback, useEffect} from 'react';
import {ScrollView, PermissionsAndroid} from 'react-native';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {Colors, Svgs} from '../../assets';
import {TabBar} from '../component/common/TabBar';
import {TagItem} from './components/TagItem';
import {firebase} from '@src/config/firebaseconfig';
import BottomSheetDetails from './components/BottomSheetDetails';
import {KeyboardAvoidingView} from '../component/common/KeyboardAvoidingView';

const tabList = [
  {label: 'Tất cả', status: 0},
  {label: 'Online', status: 1},
  {label: 'Ofline', status: 2},
];

const HomeScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [vehicleList, setVehicleList] = useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('vehicle')
      .get()
      .then(result => result.docs)
      .then(docs =>
        docs.map(doc => ({
          id: doc.id,
          method: doc.data().method,
          active: doc.data().active,
          name: doc.data().name,
        })),
      )
      .then(data => {
        setVehicleList(data);
      });
  }, []);

  const onChangeType = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  const onDeleteVehicle = useCallback(async (item: string) => {
    await firebase.firestore().collection('vehicle').doc(item).delete();
    firebase
      .firestore()
      .collection('vehicle')
      .get()
      .then(result => result.docs)
      .then(docs =>
        docs.map(doc => ({
          id: doc.id,
          method: doc.data().method,
          active: doc.data().active,
          name: doc.data().name,
        })),
      )
      .then(data => {
        setVehicleList(data);
      });
  }, []);
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.white}>
      <MainTitle marginH-24 title="Thiết bị" />
      <TabBar
        indexSelected={tabIndex}
        setIndexSelected={onChangeType}
        tabList={tabList}
      />
      <ScrollView style={{flex: 1}}>
        {tabIndex === 0
          ? vehicleList.map((item: any, index: number) => (
              <TagItem
                title={item.name}
                type={item.method}
                active={item.active}
                onDelete={() => onDeleteVehicle(item.id)}
                key={index}
              />
            ))
          : tabIndex === 1
          ? vehicleList
              .filter(item => item.active)
              .map((item: any, index: number) => (
                <TagItem
                  title={item.name}
                  type={item.method}
                  active={item.active}
                  onDelete={() => onDeleteVehicle(item.id)}
                  key={index}
                />
              ))
          : tabIndex === 2
          ? vehicleList
              .filter(item => !item.active)
              .map((item: any, index: number) => (
                <TagItem
                  title={item.name}
                  type={item.method}
                  active={item.active}
                  onDelete={onDeleteVehicle}
                  key={index}
                />
              ))
          : null}
      </ScrollView>
      <BottomSheetDetails setVehicleList={setVehicleList} />
    </Container>
  );
};

export default HomeScreen;
