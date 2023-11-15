import React, {useCallback, useState} from 'react';
import {useRef, useMemo} from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../../../assets';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Picker, View} from 'react-native-ui-lib';
import Input from '@src/screens/component/common/Input';
import {firebase} from '@src/config/firebaseconfig';

const TRAVEL_METHOD_OPTIONS = [
  {label: 'Motor', value: 'motor', id: 'motor'},
  {label: 'Car', value: 'car', id: 'car'},
];

const BottomSheetDetails = props => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['10%', '100%'], []);
  const [newVehicle, setNewVehicle] = useState('');
  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    'motor',
  );
  const onAddVehicle = useCallback(() => {
    if (!newVehicle) {
      return;
    }
    firebase.firestore().collection('vehicle').add({
      method: 'car',
      active: false,
      name: newVehicle,
    });
    setNewVehicle('');
  }, [newVehicle]);

  return (
    <GestureHandlerRootView
      style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}>
        <View style={styles.handleIndicatorContainer}>
          <Text style={styles.routeDetailsText}>Thêm phương tiện</Text>
        </View>
        <View style={styles.deliveryDetailsContainer}>
          <View center style={styles.adressContainer}>
            <Text style={styles.adressText}>Tên xe:</Text>
            <Input textValue={newVehicle} onChangeText={setNewVehicle} />
          </View>
          <View center style={styles.adressContainer}>
            <Text style={styles.adressText}>Phương tiện:</Text>
            <Picker
              migrate
              placeholder="Chọn phương tiện"
              value={selectedId}
              onChange={value => setSelectedId(value)}
              topBarProps={{title: 'Travel'}}
              showSearch={false}
              // style={{ color: Colors.black }}
              // useNativePicker
            >
              {TRAVEL_METHOD_OPTIONS.map(option => (
                <Picker.Item
                  key={option.id}
                  value={option.id}
                  label={option.label}
                />
              ))}
            </Picker>
          </View>
        </View>
        <Pressable
          onPress={onAddVehicle}
          style={{
            ...styles.buttonContainer,
            backgroundColor: '#3FC060',
          }}>
          <Text style={styles.buttonText}>Thêm</Text>
        </Pressable>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
  },
  handleIndicator: {
    backgroundColor: 'grey',
    width: 100,
  },
  handleIndicatorContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  routeDetailsText: {
    fontSize: 25,
    letterSpacing: 1,
  },
  deliveryDetailsContainer: {
    paddingHorizontal: 20,
  },
  restaurantName: {
    fontSize: 25,
    letterSpacing: 1,
  },
  adressContainer: {
    flexDirection: 'row',
  },
  adressText: {
    fontSize: 20,
    color: 'grey',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 15,
  },
  orderDetailsContainer: {
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    paddingTop: 20,
  },
  orderItemText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  buttonContainer: {
    marginVertical: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    paddingVertical: 15,
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  icons: {
    height: 24,
    width: 24,
  },
  textHighlight: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  addVehicle: {
    borderRadius: 24,
    width: 48,
    height: 48,
    borderColor: Colors.greyNightRider,
    borderWidth: 2,
  },
});

export default BottomSheetDetails;
