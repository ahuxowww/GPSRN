import React, {FC, memo, useCallback, useState, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput as TextInputMask,
  TextInputProps,
} from 'react-native';
import {
  View,
  TouchableOpacity,
  TextField as TextFieldRN,
  Colors as ColorsUI,
} from 'react-native-ui-lib';

import {Colors, Svgs} from '@src/assets';
import Text from './Text';

interface Props {
  useTextField?: boolean;
  disabled?: boolean;
  subTitle?: string;
  style?: any;
  inputStyle?: any;
  onChangeText?: (text: string) => void;
  label?: string;
  value?: string;
  placeholder?: String;
  isError?: boolean;
  messageError?: string;
  onClear?: () => void;
  iconRight?: any;
  iconLeft?: any;
  colorIcon?: any;
  onPressIcon?: () => void;
  customRightComponent?: JSX.Element;
  secureTextEntry?: boolean;
  onFocusAction?: () => void;
  unit?: string;
}

const TextInputView: FC<Props & TextInputProps> = ({
  disabled,
  useTextField,
  subTitle,
  style,
  inputStyle,
  onChangeText,
  label,
  value,
  placeholder,
  isError,
  messageError,
  onClear,
  iconRight: IconRight,
  iconLeft: IconLeft,
  colorIcon,
  onPressIcon,
  customRightComponent,
  secureTextEntry,
  onFocusAction,
  unit,
  ...props
}) => {
  const ref = useRef<any>();

  const [selected, setSelect] = useState(false);

  const onBlurInput = useCallback(() => setSelect(false), []);

  const onFocus = useCallback(() => {
    if (!selected && ref) {
      onFocusAction && onFocusAction();
      ref?.current?.focus();
      setSelect(true);
    }
  }, [onFocusAction, selected]);

  const onEndEditing = useCallback(() => {
    setSelect(false);
  }, []);

  const onClearInput = useCallback(() => {
    onClear && onClear();
    setSelect(false);
  }, [onClear]);

  const disableBG = disabled ? {backgroundColor: Colors.greySuva} : {};

  return (
    <>
      {subTitle ? (
        <View row flex paddingB-8 width={'100%'}>
          <Text body_regular>{subTitle}</Text>
        </View>
      ) : null}
      <View
        paddingH-24
        bg-white
        centerV
        row
        style={[
          styles.button,
          isError ? styles.borderError : {},
          disableBG,
          style,
        ]}>
        {IconLeft && (
          <TouchableOpacity onPress={onPressIcon} disabled={!onPressIcon}>
            <View style={styles.iconRelative} marginR-12>
              <IconLeft fill={colorIcon} />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity flex activeOpacity={1} onPress={onFocus}>
          {useTextField ? (
            <View flex>
              <TextFieldRN
                ref={ref}
                placeholder={label}
                floatOnFocus
                floatingPlaceholder
                floatingPlaceholderColor={
                  !!value || selected ? Colors.greyNightRider : Colors.greyDrank
                }
                floatingPlaceholderStyle={
                  !!value || selected
                    ? styles.marginTopSelected
                    : styles.marginTopNoSelected
                }
                onBlur={onBlurInput}
                onEndEditing={onEndEditing}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                autoCapitalize={'none'}
                autoCorrect={false}
                selectionColor={Colors.greyNightRider}
                underlineColor={false}
                secureTextEntry={secureTextEntry}
                style={[styles.input, inputStyle]}
                readonly={disabled}
                {...props}
              />
              {!!placeholder && value === '' && selected && (
                <View style={styles.placeholderStyle}>
                  <Text style={styles.greyDrank}>{placeholder}</Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              {!!label && <Text>{label}</Text>}
              <TextInputMask
                ref={ref}
                onBlur={onBlurInput}
                onEndEditing={onEndEditing}
                value={
                  !selected && unit
                    ? (props?.keyboardType === 'number-pad' && value === ''
                        ? '0'
                        : value) + `${unit}`
                    : value
                }
                readOnly={disabled}
                onChangeText={onChangeText}
                onFocus={onFocus}
                autoCapitalize={'none'}
                autoCorrect={false}
                selectionColor={ColorsUI.themeColor}
                style={[
                  styles.secondInput,
                  inputStyle,
                  label ? styles.marginTop : {},
                ]}
                {...props}
                placeholder={selected ? '' : placeholder}
                placeholderTextColor={Colors.greyDrank}
                secureTextEntry={secureTextEntry}
              />
            </View>
          )}
        </TouchableOpacity>
        {onClear && !!value && (
          <TouchableOpacity
            marginR-16={!!customRightComponent || !!IconRight}
            onPress={onClearInput}>
            <Svgs.Close height={24} width={24} fill={Colors.greyDrank} />
          </TouchableOpacity>
        )}
        {customRightComponent ? customRightComponent : null}
        {IconRight && (
          <TouchableOpacity onPress={onPressIcon} disabled={!onPressIcon}>
            <View style={styles.iconRelative}>
              <IconRight fill={colorIcon} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {isError && (
        <View row left marginV-4 paddingL-16 style={styles.errorContainer}>
          <Text body_regular color={Colors.redAlizarin}>
            {messageError}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.whiteSmoke,
  },
  input: {
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? -3 : -4,
    color: Colors.greyNightRider,
    lineHeight: 20,
  },
  secondInput: {
    marginRight: 10,
    color: Colors.greyNightRider,
    lineHeight: 20,
  },
  iconRelative: {
    position: 'relative',
  },
  borderError: {
    borderColor: Colors.redAlizarin,
  },
  errorContainer: {
    width: '100%',
  },
  marginTopSelected: {
    marginTop: Platform.OS === 'ios' ? -5 : -3,
  },
  marginTopNoSelected: {
    marginTop: -10,
  },
  placeholderStyle: {
    top: Platform.OS === 'ios' ? -15 : -23,
  },
  marginTop: {
    marginTop: 4,
  },
  greyDrank: {
    color: Colors.greyDrank,
  },
});

export const TextInput = memo<Props & TextInputProps>(TextInputView);
