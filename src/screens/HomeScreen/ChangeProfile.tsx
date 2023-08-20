import React, {useCallback, useState} from 'react';
import {Colors} from '../../assets';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import Input from '../component/common/Input';
import {useRoute} from '@react-navigation/native';

const ChangeProfileScreen = () => {
  const {params}: any = useRoute();
  const [textValue, setTextValue] = useState('');
  const onChangeText = useCallback((value: string) => {
    setTextValue(value);
  }, []);
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.white}>
      <MainTitle isgoBack marginH-24 title="Thay đổi thông tin" />
      <Input
        placeholder={'Nhập tên bạn vào đây'}
        //   isError={}
        errorText={'Mời bạn nhập lại'}
        textValue={textValue}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default ChangeProfileScreen;
