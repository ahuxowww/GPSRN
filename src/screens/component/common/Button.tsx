import React, {FC, memo, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from './Text';
import {Colors, Images} from '../../../assets';

interface HeaderProps {
  customHeaderLeft?: JSX.Element;
  customHeaderRight?: JSX.Element;
  title?: string;
  customTitle?: string;
  onClose?: () => void;
  onGoBackAction?: () => void;
  noBorderBottom?: boolean;
  style?: any;
  notGoBack?: boolean;
}

const HeaderView: FC<HeaderProps> = props => {
  const navigation = useNavigation();

  const onGoBack = useCallback(async () => {
    props.onGoBackAction && props.onGoBackAction();
    navigation.goBack();
  }, [navigation, props]);

  const onBackCustom = useCallback(async () => {
    props.onGoBackAction && props.onGoBackAction();
  }, [props]);

  return (
    <View
      centerV
      style={[
        styles.header,
        props?.noBorderBottom ? {} : styles.border,
        props?.style,
      ]}>
      {props.customHeaderLeft ? (
        props.customHeaderLeft
      ) : (
        <TouchableOpacity
          center
          style={styles.buttonBack}
          onPress={props.notGoBack ? onBackCustom : onGoBack}>
          <Image source={Images.logo.left} style={{height: 20, width: 20}} />
        </TouchableOpacity>
      )}
      <View flex center>
        {props.customTitle ? (
          <Text h_page_title>{props.customTitle}</Text>
        ) : (
          <Text h_page_title />
        )}
      </View>
      {props.customHeaderRight ? (
        props.customHeaderRight
      ) : (
        <View style={styles.buttonBack} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    height: 56,
    backgroundColor: Colors.white,
  },
  headerWidthBack: {
    justifyContent: 'flex-end',
  },
  buttonBack: {
    height: 56,
    width: 52,
    display: 'flex',
    justifyContent: 'center',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteSmoke,
  },
});

export const Header = memo<HeaderProps>(HeaderView);
