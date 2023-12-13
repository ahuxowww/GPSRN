import {Colors, Images, Metrics} from '@src/assets';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {AppThunkDispatch} from '@src/redux/common';
import Container from '../component/Container';
import {Button} from '../component/common/Button';
import {TextInput} from '../component/common/TextInput';
import {KeyboardAvoidingView} from '../component/common/KeyboardAvoidingView';
import {actions} from '@src/redux/user/UserActions';
import {Image} from 'react-native';
import MainTitle from '../component/MainTitle';
import {firebase} from '@src/config/firebaseconfig';
import {useUserLogin} from '@src/hooks/user';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditProfile = () => {
  const {params}: any = useRoute();
  const navigation = useNavigation();
  const isProfile = params?.isProfile;
  const dispatch = useDispatch<AppThunkDispatch>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const scrollViewRef = useRef<any>();
  const {userData} = useUserLogin();
  const editProfile = useCallback(async () => {
    await firebase.firestore().collection('user').doc(userData.id).update({
      username: name,
      age: age,
      phone: phone,
    });
    firebase
      .firestore()
      .collection('user')
      .get()
      .then(result => result.docs)
      .then(docs =>
        docs.map(doc => ({
          id: doc.id,
          username: doc.data().username,
          uri: doc.data().uri,
          method: doc.data().method,
        })),
      )
      .then(data => {
        dispatch(actions.saveUserData({userData: data[0]}));
      });
  }, [age, dispatch, name, phone, userData.id]);

  const onSubmit = useCallback(async () => {
    await editProfile();

    if (isProfile) {
      navigation.goBack();
    } else {
      dispatch(
        actions.saveUser({
          user: {
            type: 'LOGIN',
          },
        }),
      );
    }
  }, [dispatch, editProfile, isProfile, navigation]);

  const onBlur = useCallback(() => {
    scrollViewRef?.current?.scrollToEnd();
  }, [scrollViewRef]);

  return (
    <KeyboardAvoidingView undefinedBehavior style={styles.safeView}>
      <Container
        safeBottom
        backgroundColor={Colors.blueDarkTurquoise}
        barStyle="dark-content"
        backgroundBody={Colors.blueDarkTurquoise}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <MainTitle title="Thông tin cá nhân" marginR-28 isgoBack />
          <View center marginV-20 marginT-50>
            <Image
              source={Images.logo.logo_app}
              style={{
                width: Metrics.screen.width - 40,
                height: 200,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View centerH>
            <TextInput
              useTextField
              label={'Nhập tên của bạn'}
              value={name}
              onChangeText={setName}
              style={styles.texFiledContainer}
              placeholder={'Nhập email'}
              colorIcon={Colors.brownKabul50}
              onPressIcon={() => {}}
              onFocus={onBlur}
            />

            <TextInput
              useTextField
              label={'Nhập số điện thoại'}
              value={phone}
              onChangeText={setPhone}
              style={styles.texFiledContainer}
              placeholder={'Nhập số điện thoại'}
              colorIcon={Colors.brownKabul50}
              onFocus={onBlur}
            />

            <TextInput
              useTextField
              label={'Nhập số tuổi'}
              value={age}
              onChangeText={setAge}
              style={styles.texFiledContainer}
              placeholder={'Nhập số tuổi'}
              colorIcon={Colors.brownKabul50}
              onFocus={onBlur}
            />
          </View>
          <View
            marginB-20
            row
            backgroundColor={Colors.blueSmalt}
            style={styles.button}>
            <Button disabled={false} label={'Xác nhận'} onPress={onSubmit} />
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 24,
  },
  texFiledContainer: {
    textAlign: 'center',
    height: 56,
    paddingVertical: 8,
    marginVertical: 8,
  },
  loginLogo: {
    height: 50,
    width: 150,
  },
  faceID: {
    height: 44,
    width: 44,
    borderRadius: 4,
    backgroundColor: Colors.redTomato,
  },
  button: {
    borderRadius: 24,
    marginTop: 24,
  },
});

export default EditProfile;
