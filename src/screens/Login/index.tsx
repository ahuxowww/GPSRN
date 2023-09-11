import {Colors, Metrics, Svgs} from '@src/assets';
import React, {useCallback, useRef, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, ScrollView} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {UserThunk} from '@src/redux/thunks';
import {AppThunkDispatch} from '@src/redux/common';
import Container from '../component/Container';
import {CheckBox} from '../component/common/CheckBox';
import {Button} from '../component/common/Button';
import {TextInput} from '../component/common/TextInput';
import {KeyboardAvoidingView} from '../component/common/KeyboardAvoidingView';
import {useSettings} from '@src/hooks/settings';
import {useUserLogin} from '@src/hooks/user';
import {DialogLib} from '../component/common/DialogLib';

const loginSchema = Yup.object().shape({
  user: Yup.string()
    .required('Không được bỏ trống!')
    .min(6, 'Tên đăng nhập phải có 6 ký tự!'),
  password: Yup.string()
    .required('Không được bỏ trống!')
    .min(4, 'Mật khẩu phải có hơn 4 ký tự!'),
});

const Login = () => {
  const {rememberedUser, isRememberPW, onSetRememberPW, onSetcurrentUserInfo} =
    useSettings();
  const {currentUser} = useUserLogin();
  const dispatch = useDispatch<AppThunkDispatch>();
  const [showPassword, setShowPassword] = useState(true);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [agreement, setAgreement] = useState<boolean>(isRememberPW);
  const scrollViewRef = useRef<any>();
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      user: rememberedUser.user,
      password: rememberedUser.password,
    },
  });
  const user = watch('user');
  const password = watch('password');

  const onAgreement = useCallback((value: boolean) => {
    setAgreement(value);
  }, []);

  const onHidePassword = useCallback(() => {
    // Hide/show password
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onSubmit = useCallback(
    async data => {
      console.log('Login screen >>>>>', data);
      dispatch(
        UserThunk.postLogin({
          username: user,
          password: password,
        }),
      );
      if (currentUser?.type === 'WRONGPASS') {
        setWrongPassword(true);
      } else {
        onSetRememberPW({rememberPW: agreement});
        if (agreement) {
          onSetcurrentUserInfo({currentPW: password, user});
        } else {
          onSetcurrentUserInfo({user: '', currentPW: ''});
        }
      }
    },
    [
      agreement,
      currentUser,
      dispatch,
      onSetRememberPW,
      onSetcurrentUserInfo,
      password,
      user,
    ],
  );

  const onBlur = useCallback(() => {
    scrollViewRef?.current?.scrollToEnd();
  }, [scrollViewRef]);

  const onCloseModal = useCallback(() => {
    setWrongPassword(false);
  }, []);

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
          <View center marginV-20 marginT-50>
            <Svgs.Logo />
          </View>
          <View centerH>
            <Controller
              name="user"
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  useTextField
                  label={'Tên đăng nhập'}
                  value={value}
                  onChangeText={onChange}
                  style={styles.texFiledContainer}
                  placeholder={'Nhập tên đăng nhập'}
                  colorIcon={Colors.brownKabul50}
                  onPressIcon={() => {}}
                  isError={!!errors?.user?.message}
                  messageError={errors?.user?.message}
                  onFocus={onBlur}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  useTextField
                  label={'Mật khẩu'}
                  value={value}
                  onChangeText={onChange}
                  style={styles.texFiledContainer}
                  placeholder={'Nhập mật khẩu'}
                  colorIcon={Colors.brownKabul50}
                  iconRight={showPassword ? Svgs.HideEye : Svgs.Eye}
                  onPressIcon={onHidePassword}
                  secureTextEntry={showPassword}
                  isError={!!errors?.password?.message}
                  messageError={errors?.password?.message}
                  onFocus={onBlur}
                />
              )}
            />
          </View>
          <View row spread centerV marginT-12>
            <CheckBox
              label="Lưu mật khẩu"
              value={agreement}
              onChange={onAgreement}
            />
            <TouchableOpacity onPress={() => {}}>
              <Text color={Colors.blueMalibu}>{'Quên mật khẩu?'}</Text>
            </TouchableOpacity>
          </View>
          <View
            marginB-20
            row
            backgroundColor={Colors.blueSmalt}
            style={styles.button}>
            <Button
              disabled={false}
              label={'Đăng nhập'}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
        <DialogLib
          visible={wrongPassword}
          title={'Đăng nhập'}
          description={'Tài khoản không tồn tại'}
          onClose={onCloseModal}
        />
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

export default Login;
