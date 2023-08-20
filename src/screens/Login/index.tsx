import {Colors, Metrics, Svgs} from '@src/assets';
import React, {useCallback, useState} from 'react';
import {LayoutChangeEvent, Platform, StyleSheet} from 'react-native';
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

const loginSchema = Yup.object().shape({
  user: Yup.string()
    .required('Không được bỏ trống!')
    .min(6, 'Tên đăng nhập phải có 6 ký tự!'),
  password: Yup.string()
    .required('Không được bỏ trống!')
    .min(4, 'Mật khẩu phải có hơn 4 ký tự!'),
});

const Login = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const [height, setHeight] = useState(0);
  const [showPassword, setShowPassword] = useState(true);
  const [agreement, setAgreement] = useState<boolean>(false);

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      user: '',
      password: '',
    },
  });
  const user = watch('user');
  const password = watch('password');

  const onLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    setHeight(nativeEvent.layout.height);
  }, []);

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
          code: user,
          password: password,
        }),
      );
    },
    [dispatch, password, user],
  );

  return (
    <Container>
      <View marginH-24 style={styles.container} onLayout={onLayout}>
        {Platform.OS === 'android' ? <View height={40} /> : null}
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
        <View row marginT-16 marginB-40>
          <Button
            disabled={false}
            label={'Đăng nhập'}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    height: Metrics.screen.height,
  },
  container: {
    flex: 1,
    marginTop: 85,
  },
  texFiledContainer: {
    textAlign: 'center',
    height: 56,
    paddingVertical: 8,
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
});

export default Login;
