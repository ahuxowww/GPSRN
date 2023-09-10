import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native-ui-lib';
import {TextStyle} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  usingCustomLabel?: boolean;
  styleText?: TextStyle;
  CustomLabelElement?: any;
}

export const ButtonText: FC<ButtonProps> = ({
  label,
  usingCustomLabel,
  CustomLabelElement,
  styleText,
  ...res
}) => {
  return (
    <TouchableOpacity row centerH {...res}>
      <View center padding-8>
        {usingCustomLabel ? (
          <CustomLabelElement />
        ) : (
          <Text style={styleText}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
