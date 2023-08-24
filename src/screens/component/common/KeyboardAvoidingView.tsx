import {
  Platform,
  Keyboard,
  KeyboardAvoidingView as KeyboardAvoidingViewRN,
  KeyboardAvoidingViewProps,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

export const KeyboardAvoidingView: React.FC<
  KeyboardAvoidingViewProps & {
    likeAndroid?: boolean;
    likeIOS?: boolean;
    undefinedBehavior?: boolean;
  }
> = ({
  behavior = Platform.OS === 'ios' ? 'padding' : 'height',
  style = {flex: 1},
  children,
  undefinedBehavior,
  ...restProps
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingViewRN
        behavior={undefinedBehavior ? undefined : behavior}
        style={style}
        {...restProps}>
        {children}
      </KeyboardAvoidingViewRN>
    </TouchableWithoutFeedback>
  );
};
