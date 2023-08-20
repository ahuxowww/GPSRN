import {Colors} from '@src/assets';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
interface SwitchProps {
  isSwitch: boolean;
  onChangeSwitch?: () => void;
  disabled?: boolean;
}

export const Switch = ({isSwitch, onChangeSwitch, disabled}: SwitchProps) => {
  const switchTranslate = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return withTiming(isSwitch ? 22 : 0);
  });

  useEffect(() => {
    if (isSwitch) {
      switchTranslate.value = 28;
    } else {
      switchTranslate.value = 4;
    }
  }, [isSwitch, switchTranslate]);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      [Colors.whiteSmoke, Colors.greenPigment],
    );
    return {
      backgroundColor,
    };
  });

  const disabledStyle = disabled ? {opacity: 0.4} : {};

  return (
    <TouchableWithoutFeedback onPress={onChangeSwitch} disabled={disabled}>
      <Animated.View
        style={[styles.container, backgroundColorStyle, disabledStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: Colors.whiteSmoke,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  opacity: {
    opacity: 0.4,
  },
});
