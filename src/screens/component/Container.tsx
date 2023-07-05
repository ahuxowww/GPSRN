import React, {FC, memo, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BackHandler,
  View,
  StyleSheet,
  StatusBarProps,
  StatusBar,
  LayoutChangeEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../assets';

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode;
  backgroundBody?: string;
  safeBottom?: boolean;
  backgroundFooter?: string;
  goHome?: boolean;
  onBackHandler?: () => void;
  setHeightSafeView?: (value: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    height: 0,
  },
});

const Container: FC<Props & StatusBarProps> = ({
  children,
  header,
  backgroundBody,
  safeBottom,
  backgroundFooter = Colors.white,
  goHome,
  onBackHandler,
  setHeightSafeView,
  ...statusBarProps
}) => {
  const navigation = useNavigation();

  const onLayout = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      if (setHeightSafeView) {
        setHeightSafeView(nativeEvent.layout.height);
      }
    },
    [setHeightSafeView],
  );

  useEffect(() => {
    const backAction = () => {
      if (goHome) {
        navigation.navigate('MAIN_TAB');
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation, onBackHandler, goHome]);

  return (
    <View style={styles.container}>
      <StatusBar translucent {...statusBarProps} barStyle="light-content" />
      {header || (
        <SafeAreaView
          edges={['right', 'left', 'top']}
          style={{backgroundColor: statusBarProps.backgroundColor}}
        />
      )}
      <SafeAreaView
        edges={['right', 'left']}
        style={[styles.container, {backgroundColor: backgroundBody}]}
        onLayout={onLayout}>
        {children}
      </SafeAreaView>
      {safeBottom && (
        <SafeAreaView
          edges={['right', 'left', 'bottom']}
          style={{backgroundColor: backgroundFooter || backgroundBody}}
        />
      )}
    </View>
  );
};

export default memo<Props & StatusBarProps>(Container);
