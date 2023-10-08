import React, {useCallback, useState} from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';
import {Colors, Svgs} from '../../assets';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import Text from '../component/common/Text';
import {useUserLogin} from '@src/hooks/user';
import {useDispatch} from 'react-redux';
import {AppThunkDispatch} from '@src/redux/common';
import {UserThunk} from '@src/redux/thunks';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomDialog} from '../component/common/BottomDialog';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const avatarState = [
  {
    label: 'Tải lên từ thư viện',
    icon: <Svgs.Image width={24} height={24} fill={Colors.greyDrank} />,
  },
  {
    label: 'Chụp ảnh',
    icon: <Svgs.Camera width={20} height={20} fill={Colors.greyDrank} />,
  },
];
const ChangeProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppThunkDispatch>();
  const {currentUser} = useUserLogin();
  const [isVisible, setVisible] = useState(false);

  const onNavToVehicle = useCallback(() => {
    navigation.navigate('SELECT_VEHICLE_SCREEN', {isProfile: true});
  }, [navigation]);

  const onNavToChangeName = useCallback(() => {
    navigation.navigate('CHANGE_NAME_PROFILE_SCREEN');
  }, [navigation]);

  const onSaveAvatar = useCallback(
    async (avatar: string) => {
      const payloadAvatar = avatar ? {avatar: avatar} : {};
      const payloadName = currentUser?.payload?.name
        ? {avatar: currentUser?.payload?.name}
        : {};
      await dispatch(
        UserThunk.postLogin({
          username: currentUser?.payload?.username,
          password: currentUser?.payload?.password,
          ...payloadName,
          ...payloadAvatar,
        }),
      );
    },
    [
      dispatch,
      currentUser?.payload?.name,
      currentUser?.payload?.password,
      currentUser?.payload?.username,
    ],
  );

  const onOpenModal = useCallback(() => {
    setVisible(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  const onLaunchCamera = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      selectionLimit: 1,
    };
    await launchCamera(options, (response: any) => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        return;
      } else if (response.errorCode === 'permission') {
        return;
      } else if (response.errorCode === 'others') {
        return;
      }
      onSaveAvatar(response?.assets[0]?.uri);
      setVisible(false);
    });
  }, [onSaveAvatar]);

  const requestCameraPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        check(PERMISSIONS.ANDROID.CAMERA).then(result => {
          if (result === RESULTS.GRANTED) {
            onLaunchCamera();
          } else {
            request(PERMISSIONS.ANDROID.CAMERA).then(res => {
              if (res === RESULTS.GRANTED) {
                onLaunchCamera();
              }
            });
          }
        });
      } else {
        check(PERMISSIONS.IOS.CAMERA).then(result => {
          if (result === RESULTS.GRANTED) {
            onLaunchCamera();
          } else {
            request(PERMISSIONS.IOS.CAMERA).then(res => {
              if (res === RESULTS.GRANTED) {
                onLaunchCamera();
              }
            });
          }
        });
      }
    } catch (err) {}
  }, [onLaunchCamera]);

  const onSelectImage = useCallback(
    async (val: number) => {
      if (val === 0) {
        setVisible(false);
        launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.6,
            maxWidth: 150,
            maxHeight: 150,
            selectionLimit: 1,
          },
          ({assets}) => {
            if (assets && assets[0] && assets[0]?.base64 && assets[0]?.uri) {
              onSaveAvatar(assets[0]?.uri);
            }
          },
        );
      } else if (val === 1) {
        await requestCameraPermission();
      }
    },
    [onSaveAvatar, requestCameraPermission],
  );

  const renderKeyExtractor = (item: any, index: number) => index.toString();

  const renderItemLibrary = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <TouchableOpacity
          centerV
          paddingV-16
          marginH-16
          height={56}
          style={styles.bottomDrawer}
          row
          onPress={() => onSelectImage(index)}>
          {item?.icon}
          <View marginL-8>
            <Text>{item?.label}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [onSelectImage],
  );

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.whiteSmoke}>
      <MainTitle isgoBack notMenu marginH-24 title="Thay đổi thông tin" />
      <ScrollView>
        <View marginT-12>
          <View
            row
            paddingH-24
            paddingV-12
            spread
            backgroundColor={Colors.white}>
            <Text h_page_title>Thay đổi tên</Text>
            <TouchableOpacity onPress={onNavToChangeName}>
              <Svgs.ArrowRight width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View marginT-12>
          <View
            row
            paddingH-24
            paddingV-12
            spread
            backgroundColor={Colors.white}>
            <Text h_page_title>Thay đổi hình nền</Text>
            <TouchableOpacity onPress={onOpenModal}>
              <Svgs.ArrowRight width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View marginT-12>
          <View
            row
            paddingH-24
            paddingV-12
            spread
            backgroundColor={Colors.white}>
            <Text h_page_title>Phương tiện</Text>
            <TouchableOpacity onPress={onNavToVehicle}>
              <Svgs.ArrowRight width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomDialog
        customTitle={'Thay đổi hình nền'}
        isVisible={isVisible}
        onCloseModal={onCloseModal}>
        <FlatList
          data={avatarState ?? []}
          keyExtractor={renderKeyExtractor}
          renderItem={renderItemLibrary}
        />
      </BottomDialog>
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomDrawer: {
    borderBottomColor: Colors.whiteSmoke,
    borderBottomWidth: 1,
  },
});

export default ChangeProfileScreen;
