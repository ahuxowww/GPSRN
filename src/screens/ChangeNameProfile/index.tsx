import React, {ReactNode, useCallback, useState} from 'react';
import {Colors, Svgs} from '../../assets';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import Input from '../component/common/Input';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {useUserLogin} from '@src/hooks/user';
import {firebase} from '@src/config/firebaseconfig';
import {actions} from '@src/redux/user/UserActions';
import {useDispatch} from 'react-redux';
import {AppThunkDispatch} from '@src/redux/common';

const ChangeNameScreen = () => {
  const navigation = useNavigation();
  const {userData} = useUserLogin();
  const dispatch = useDispatch<AppThunkDispatch>();

  const [textValue, setTextValue] = useState('');
  const onChangeText = useCallback((value: string) => {
    setTextValue(value);
  }, []);

  const onSaveNameText = useCallback(async () => {
    if (!userData) {
      return;
    }

    await firebase.firestore().collection('user').doc(userData.id).update({
      username: textValue,
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

    navigation.navigate('CHANGE_PROFILE_SCREEN');
  }, [userData, textValue, navigation, dispatch]);

  const CustomRightIcon: ReactNode = (
    <TouchableOpacity marginR-16 onPress={onSaveNameText}>
      <Svgs.CheckSuccess width={28} height={28} fill={Colors.white} />
    </TouchableOpacity>
  );

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.blueSmalt}>
      <MainTitle
        isgoBack
        marginH-24
        title="Thay đổi thông tin"
        customRightIcon={CustomRightIcon}
      />
      <Input
        placeholder={'Nhập tên bạn vào đây'}
        errorText={'Mời bạn nhập tên bạn vào đây'}
        textValue={textValue}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default ChangeNameScreen;
