import React from 'react';
import {useRef, useMemo} from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Images, Svgs} from '../../../assets';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const BottomSheetDetails = props => {
  const {totalKm, totalMinutes} = props;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['12%', '80%'], []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}>
        <Text style={styles.textHighlight}>Bạn đang Online</Text>
        <View style={styles.handleIndicatorContainer}>
          <Text style={styles.routeDetailsText}>
            {totalMinutes.toFixed(0)} min
          </Text>
          <Image source={Images.logo.home} style={styles.icons} />
          <Text style={styles.routeDetailsText}>{totalKm.toFixed(2)} km</Text>
        </View>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.restaurantName}>fdgfd</Text>
          <View style={styles.adressContainer}>
            <Image source={Images.logo.home} style={styles.icons} />
            <Text style={styles.adressText}>fgd</Text>
          </View>

          <View style={styles.adressContainer}>
            <Image source={Images.logo.home} style={styles.icons} />
            <Text style={styles.adressText}>gdfgd</Text>
          </View>
        </View>
        <Pressable
          style={{
            ...styles.buttonContainer,
            backgroundColor: '#3FC060',
          }}>
          <Text style={styles.buttonText}>sdadasdsa</Text>
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
    paddingVertical: 20,
  },
  adressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
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
    marginTop: 'auto',
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
});

export default BottomSheetDetails;
