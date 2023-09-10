import React, {FC, memo, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, Svgs} from '@src/assets';
import Text from './Text';

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
          <Svgs.Back width={20} height={20} fill={Colors.greyNightRider} />
        </TouchableOpacity>
      )}
      <View flex center>
        {props.customTitle ? (
          <Text h_page_title>{props.customTitle}</Text>
        ) : (
          <Text h_page_title text={props?.title} />
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
