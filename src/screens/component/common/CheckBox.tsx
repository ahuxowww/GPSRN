import {Colors} from '@src/assets';
import React, {FC, useCallback, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Checkbox, TouchableOpacity, View} from 'react-native-ui-lib';
import Text from './Text';

interface Props {
  useRadioCheckBox?: boolean;
  disabled?: boolean;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  hiddenCheckbox?: boolean;
  customRightComponent?: JSX.Element;
  disabledWithOtherColor?: boolean;
}

const CheckBoxView: FC<Props> = ({
  useRadioCheckBox,
  disabled,
  label,
  value,
  onChange,
  hiddenCheckbox = false,
  customRightComponent,
  disabledWithOtherColor,
  ...style
}) => {
  const [valueAnimated] = useState(new Animated.Value(0));

  const shadeStyle = {
    backgroundColor: value ? Colors.blueDarkTurquoise : Colors.greyDrank,
    opacity: valueAnimated.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.1, 0.2, 0],
    }),
    transform: [
      {
        scale: valueAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        }),
      },
    ],
  };

  const onValueChange = useCallback(() => {
    valueAnimated.setValue(0);
    Animated.timing(valueAnimated, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
    onChange && onChange(!value);
  }, [onChange, value, valueAnimated]);

  const borderColor = {borderColor: Colors.blueDarkTurquoise};

  const checkboxStyle = disabledWithOtherColor
    ? value
      ? {
          backgroundColor: Colors.blueDarkTurquoise + '4D',
          borderColor: Colors.blueDarkTurquoise + '4D',
        }
      : {
          backgroundColor: Colors.whiteGainsboro,
          borderColor: Colors.whiteGainsboro,
        }
    : {backgroundColor: Colors.white};
  return (
    <View row centerV>
      {!hiddenCheckbox && (
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={1}
          {...style}
          onPress={onValueChange}>
          <View width={24} height={24} center marginR-8={!!label}>
            <Animated.View style={[styles.shade, shadeStyle]} />
            {useRadioCheckBox ? (
              <View
                style={
                  value
                    ? disabled
                      ? [styles.disabledSelectedContainer, borderColor]
                      : [styles.selectedContainer, borderColor]
                    : disabled
                    ? [styles.disabledNoSelectedContainer]
                    : styles.noSelectedContainer
                }
              />
            ) : (
              <Checkbox
                disabled={disabled}
                color={
                  value
                    ? disabledWithOtherColor
                      ? Colors.blueDarkTurquoise + '4D'
                      : Colors.blueSmalt
                    : Colors.blueMalibu
                }
                borderRadius={3}
                borderWidth={1}
                size={20}
                value={value}
                onValueChange={onValueChange}
                containerStyle={disabled ? styles.disabledBG : checkboxStyle}
              />
            )}
          </View>
        </TouchableOpacity>
      )}
      {!!label && (
        <View style={styles.viewTextLabel}>
          <Text color={Colors.whiteSmoke} body_regular>{label}</Text>
        </View>
      )}
      {customRightComponent ? customRightComponent : null}
    </View>
  );
};

const styles = StyleSheet.create({
  shade: {
    height: 24,
    width: 24,
    borderRadius: 12,
    position: 'absolute',
  },
  selectedContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 5,
  },
  disabledSelectedContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 5,
    opacity: 0.5,
  },
  noSelectedContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.greyNightRider,
  },
  disabledNoSelectedContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.greyDrank,
    backgroundColor: Colors.whiteGainsboro,
    opacity: 0.5,
  },
  disabledBG: {
    backgroundColor: Colors.whiteGainsboro,
  },
  viewTextLabel: {
    flex: 1,
  },
});

export const CheckBox = CheckBoxView;
