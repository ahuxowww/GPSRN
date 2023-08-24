import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import {ViewStyle} from 'react-native';
import Text from './Text';
import {Colors} from '@src/assets';
interface ButtonProps {
  disabled?: boolean;
  buttonViewStyle?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  styleLabel?: any;
  label?: string;
  onPress?: () => void;
  noUsingFlex?: boolean;
  usingCustomLabel?: boolean;
  CustomLabelElement?: any;
}

const ButtonView: FC<ButtonProps> = ({
  disabled,
  buttonContainerStyle,
  label,
  onPress,
  noUsingFlex,
  usingCustomLabel,
  CustomLabelElement,
  ...res
}) => {
  return (
    <View row flex={!noUsingFlex} centerH {...res}>
      <TouchableOpacity
        row
        flex={!noUsingFlex}
        centerH
        style={buttonContainerStyle}
        disabled={disabled}
        onPress={onPress}>
        <View flex={!noUsingFlex} center paddingV-12>
          {usingCustomLabel ? (
            <CustomLabelElement />
          ) : (
            <Text body_bold color={Colors.whiteSmoke}>
              {label ?? ''}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const Button = ButtonView;
