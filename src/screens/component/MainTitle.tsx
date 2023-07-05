import React, {FC} from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Metrics} from '../../assets';
import Text from './common/Text';
import Svgs from '../../assets/svg';

interface Props {
  customStyle?: any;
  title?: string | null;
  fontSize?: number;
  isOneLine?: boolean;
}

const MainTitle: FC<Props> = ({
  title,
  fontSize,
  isOneLine,
  ...customStyle
}) => {
  const customFontSize = fontSize ? {fontSize} : styles.title;

  return (
    <View row style={styles.header}>
      <Text h2 color={Colors.white} style={customFontSize} {...customStyle}>
        {title}
      </Text>
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
});

export default MainTitle;
