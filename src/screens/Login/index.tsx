import {Colors, Images, Metrics, Svgs} from '@src/assets';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, ScrollView} from 'react-native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
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
import {FIREBASE_APP} from '@src/config/firebaseconfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {actions} from '@src/redux/user/UserActions';
import {Image} from 'react-native';
import Text from '../component/common/Text';
import {useNavigation} from '@react-navigation/native';
import MainTitle from '../component/MainTitle';
import {getAuth} from 'firebase/auth';

const loginSchema = Yup.object().shape({
  user: Yup.string()
    .required('Không được bỏ trống!')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Chưa đúng định dạng email',
    ),
  password: Yup.string()
    .required('Không được bỏ trống!')
    .min(6, 'Mật khẩu phải có hơn 6 ký tự!'),
});

const Login = () => {
  const {rememberedUser, isRememberPW, onSetRememberPW, onSetcurrentUserInfo} =
    useSettings();
  const dispatch = useDispatch<AppThunkDispatch>();
  const [showPassword, setShowPassword] = useState(true);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [agreement, setAgreement] = useState<boolean>(isRememberPW);
  const scrollViewRef = useRef<any>();
  const navigation = useNavigation();
  const auth = getAuth(FIREBASE_APP);
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

  const signIn = useCallback(async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, user, password);
      if (res) {
        dispatch(
          actions.saveUser({
            user: {
              type: 'LOGIN',
            },
          }),
        );
        onSetRememberPW({rememberPW: agreement});
        if (agreement) {
          onSetcurrentUserInfo({currentPW: password, user});
        } else {
          onSetcurrentUserInfo({user: '', currentPW: ''});
        }
      }
    } catch (e) {
      setWrongPassword(true);
    }
  }, [
    agreement,
    auth,
    dispatch,
    onSetRememberPW,
    onSetcurrentUserInfo,
    password,
    user,
  ]);

  const signUp = useCallback(async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, user, password);
    } catch (e) {
      console.log(e);
    }
  }, [auth, password, user]);

  const onSubmit = useCallback(
    async data => {
      signIn();
    },
    [signIn],
  );

  const onBlur = useCallback(() => {
    scrollViewRef?.current?.scrollToEnd();
  }, [scrollViewRef]);

  const onCloseModal = useCallback(() => {
    setWrongPassword(false);
  }, []);

  const onSignIn = useCallback(() => {
    navigation.navigate('SIGN_IN');
  }, [navigation]);

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
          <MainTitle title="Đăng nhập" marginR-28/>
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
            <Controller
              name="user"
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  useTextField
                  label={'Email'}
                  value={value}
                  onChangeText={onChange}
                  style={styles.texFiledContainer}
                  placeholder={'Nhập email'}
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
          <TouchableOpacity center onPress={onSignIn}>
            <Text body_bold color={Colors.white}>
              {' '}
              Bạn chưa có tài khoản ?{' '}
            </Text>
          </TouchableOpacity>
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
