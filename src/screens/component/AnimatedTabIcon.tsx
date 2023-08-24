import React, {
  FC,
  memo,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

import {useNavigation} from '@react-navigation/native';
import {
  Colors,
  IconHistory,
  IconHome,
  IconNotificationsNoBag,
  IconProfile,
  Metrics,
} from '../../assets';

interface Props {
  active?: boolean;
  targetScreen?: string;
  title?: string;
}

interface IconProps {
  active?: boolean;
  children: ReactNode;
}

const Icon: FC<IconProps> = ({active, children}) => {
  if (active) {
    return (
      <View style={styles.containerIcon}>
        <View style={styles.line} />
        <View style={styles.tabIcon} />
        <View style={styles.containerActive}>{children}</View>
      </View>
    );
  }
  return <>{children}</>;
};

const AnimatedTabIcon: FC<Props> = ({active, targetScreen, title}) => {
  const [value] = useState(new Animated.Value(0));

  const [firstRun, setFirstRun] = useState(
    targetScreen?.toLocaleUpperCase() === 'HOME',
  );

  const navigation = useNavigation();

  const onAction = useCallback(async () => {
    value.setValue(0);
    Animated.timing(value, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
  }, [value]);

  const animationStyle = (() => ({
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 0.6, 1],
          outputRange:
            Platform.OS === 'ios'
              ? [-2, -4, -5]
              : [
                  -3,
                  -6,
                  targetScreen?.toLocaleUpperCase() === 'HOMESCREEN' ? -6 : -8,
                ],
        }),
      },
      {
        scale: value.interpolate({
          inputRange: [0, 0.6, 1],
          outputRange: [1, 5 / 3, 4 / 3],
        }),
      },
    ],
  }))();

  const onNavToTargetScreen = useCallback(() => {
    onAction();
    switch (targetScreen?.toLocaleUpperCase()) {
      case 'HOME':
        navigation.navigate('HOMESCREEN');
        break;
      case 'EVENT_REGISTRATION':
        navigation.navigate('EVENT_REGISTRATION');
        break;
      case 'NOTIFICATION':
        navigation.navigate('NOTIFICATION');
        break;
      case 'MY_PAGE':
        navigation.navigate('MY_PAGE');
        break;
    }
  }, [navigation, onAction, targetScreen]);

  useEffect(() => {
    if (!active) {
      value.setValue(0);
    }
  }, [value, active]);

  useEffect(() => {
    if (firstRun && active) {
      setFirstRun(false);
      onAction();
    }
  }, [active, firstRun, onAction]);

  return (
    <TouchableWithoutFeedback disabled={active} onPress={onNavToTargetScreen}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.animatedContainer,
            !active && targetScreen === 'HOME' ? styles.containerHome : {},
          ]}>
          <Icon active={active}>
            {targetScreen === 'HOME' && (
              <IconHome
                active={active}
                color={
                  active ? Colors.blueDarkTurquoise : Colors.greyNightRider57
                }
                style={animationStyle}
              />
            )}
            {targetScreen === 'NOTIFICATION' && (
              <IconNotificationsNoBag
                color={
                  active ? Colors.blueDarkTurquoise : Colors.greyNightRider57
                }
                style={animationStyle}
              />
            )}
            {targetScreen === 'EVENT_REGISTRATION' && (
              <IconHistory
                color={
                  active ? Colors.blueDarkTurquoise : Colors.greyNightRider57
                }
                style={animationStyle}
              />
            )}
            {targetScreen === 'MY_PAGE' && (
              <IconProfile
                color={
                  active ? Colors.blueDarkTurquoise : Colors.greyNightRider57
                }
                style={animationStyle}
              />
            )}
          </Icon>
        </Animated.View>
        <Text
          fs11
          lh14
          color={active ? Colors.blueDarkTurquoise : Colors.greyNightRider}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerActive: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderRadius: 30,
    display: 'flex',
    height: 60,
    justifyContent: 'center',
    bottom: -5,
    width: 60,
  },
  line: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Colors.greyVeryLight,
    opacity: 0.8,
  },
  tabIcon: {
    backgroundColor: Colors.white,
    position: 'absolute',
    height: Platform.OS === 'ios' ? 49 : 49.5,
    width: 60,
    top: 19,
    bottom: -5,
  },
  container: {
    height: 49,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    width: Metrics.screen.width / 4,
  },
  containerIcon: {
    backgroundColor: Colors.white,
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 7,
  },
  animatedContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHome: {
    bottom: Platform.OS === 'ios' ? -4 : -3.5,
  },
});

export default memo<Props>(AnimatedTabIcon);
