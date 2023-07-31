import React, {useCallback, FC} from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, Images, Metrics} from '../../assets';
import Text from './common/Text';
interface Props {
  customStyle?: any;
  title?: string | null;
  fontSize?: number;
  isOneLine?: boolean;
}

const MainTitle: FC<Props> = ({title, fontSize, isOneLine, ...customStyle}) => {
  const customFontSize = fontSize ? {fontSize} : styles.title;
  const navigation = useNavigation();

  const onNavSetting = useCallback(() => {
    navigation.navigate('SETTING_SCREEN');
  }, [navigation]);

  return (
    <View row style={styles.header}>
      <Text h3 color={Colors.white} style={customFontSize} {...customStyle}>
        {title}
      </Text>
      <TouchableOpacity onPress={onNavSetting}>
        <Image source={Images.logo.menu} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  header: {
    height: 46,
    width: Metrics.screen.width,
    backgroundColor: Colors.blueDarkTurquoise,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 2,
  },
  icon: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
});

export default MainTitle;
