import React, {ReactNode, useCallback, useState} from 'react';
import {Colors, Svgs} from '../../assets';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import Input from '../component/common/Input';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {UserThunk} from '@src/redux/thunks';
import {useDispatch} from 'react-redux';
import {AppThunkDispatch} from '@src/redux/common';
import {useUserLogin} from '@src/hooks/user';

const ChangeNameScreen = () => {
  const {params}: any = useRoute();
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigation = useNavigation();
  const {currentUser} = useUserLogin();

  const [textValue, setTextValue] = useState('');
  const onChangeText = useCallback((value: string) => {
    setTextValue(value);
  }, []);

  const onSaveNameText = useCallback(async () => {
    const payloadName = textValue ? {name: textValue} : {};
    const payloadAvatar = currentUser?.payload?.avatar
      ? {avatar: currentUser?.payload?.avatar}
      : {};
    await dispatch(
      UserThunk.postLogin({
        username: currentUser?.payload?.username,
        password: currentUser?.payload?.password,
        ...payloadName,
        ...payloadAvatar,
      }),
    );
    navigation.navigate('CHANGE_PROFILE_SCREEN');
  }, [dispatch, navigation, textValue, currentUser]);

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
