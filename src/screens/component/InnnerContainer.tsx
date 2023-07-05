import React from 'react';
import {StyleSheet, View} from 'react-native';

interface InnerContainerProps {
  children: React.ReactNode;
}

const InnerContainer = ({children}: InnerContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default InnerContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
