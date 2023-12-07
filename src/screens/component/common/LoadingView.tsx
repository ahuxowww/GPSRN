import {Colors} from '@src/assets';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';

export const LoadingView: React.FC = () => {
  return (
    // add zindex to overide all views on android
    <View style={[styles.absoluteFill, {zIndex: 99}]}>
      <View style={styles.blurFill}>
        <ActivityIndicator animating color={Colors.greyDarkGray} size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteFill: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  blurFill: {
    alignItems: 'stretch',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
