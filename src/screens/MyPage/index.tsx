import React, {useCallback} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {Colors, Metrics, Svgs} from '../../assets';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import Text from '../component/common/Text';
import {Switch} from '../component/common/Switch';
import {useNavigation} from '@react-navigation/native';
import {UserThunk} from '@src/redux/thunks';
import {useDispatch} from 'react-redux';
import {AppThunkDispatch} from '@src/redux/common';
import {useUserLogin} from '@src/hooks/user';

const MyPageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppThunkDispatch>();
  const {user, followUser, onChangeFollowUser} = useUserLogin();

  const onChangeSwitch = useCallback(async () => {
    await onChangeFollowUser({followUser: followUser ? !followUser : true});
  }, [followUser, onChangeFollowUser]);

  const mockData = {
    avatar:
      'https://cdn.popsww.com/blog/sites/2/2022/02/demon-slayer-nezuko.jpg',
    name: 'Kimm moo chee',
    times: 12,
    total: 3.2,
  };

  const onNavToProfile = useCallback(() => {
    navigation.navigate('CHANGE_PROFILE_SCREEN');
  }, [navigation]);

  const onLogOut = useCallback(async () => {
    dispatch(UserThunk.Logout());
  }, [dispatch]);

  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="light-content"
      backgroundBody={Colors.whiteSmoke}>
      <MainTitle marginH-24 title="Giới thiệu" />
      <ScrollView>
        <View marginT-12>
          <View
            row
            centerV
            backgroundColor={Colors.white}
            spread
            paddingH-24
            paddingV-12>
            <View row centerV>
              <Image
                source={
                  user?.payload?.avatar
                    ? {uri: user?.payload?.avatar}
                    : {uri: mockData.avatar}
                }
                style={styles.avatar}
              />
              <Text marginL-24 h_page_title>
                {user?.payload?.name ?? mockData?.name}
              </Text>
            </View>
            <TouchableOpacity onPress={onNavToProfile}>
              <Svgs.ArrowRight width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View marginH-24 marginT-12>
          <Text h_highlight>Hôm nay</Text>
        </View>
        <View marginT-12>
          <View row paddingV-12 backgroundColor={Colors.white}>
            <View marginL-24 style={styles.subContent}>
              <Text body_bold>{mockData.total}</Text>
              <Text body_regular>
                Quãng đường (km) {mockData?.total ? '🤗' : '😴'}
              </Text>
            </View>
            <View marginH-12 style={styles.subContent}>
              <Text body_bold>{mockData?.times}</Text>
              <Text body_regular>Số lần vượt quá tốc độ</Text>
            </View>
            <View marginH-12 style={styles.subContent}>
              <Text body_bold>0</Text>
              <Text body_regular>To do</Text>
            </View>
          </View>
        </View>
        <View marginT-12>
          <View
            row
            paddingH-24
            paddingV-12
            spread
            backgroundColor={Colors.white}>
            <Text h_page_title>
              Người dùng: {!followUser ? 'Người đi' : 'Người theo dõi'}
            </Text>
            <Switch
              isSwitch={followUser || false}
              onChangeSwitch={onChangeSwitch}
            />
          </View>
        </View>
        <View marginT-40>
          <TouchableOpacity
            centerH
            paddingV-12
            backgroundColor={Colors.white}
            onPress={onLogOut}>
            <Text h_page_title>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    resizeMode: 'cover',
    borderColor: Colors.greyNightRider57,
  },
  subContent: {
    width: (Metrics.screen.width - 48) / 3,
    borderRightWidth: 1,
    borderColor: Colors.greyNightRider57,
  },
});
export default MyPageScreen;
