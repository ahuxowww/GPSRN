import React, {FC, memo, useCallback, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {Colors, Metrics, Svgs} from '@src/assets';
import {View} from 'react-native-ui-lib';
import Text from './Text';

interface Props {
  placeholder?: string;
  isError?: boolean;
  errorText?: string;
  disabled?: boolean;
  textValue: string;
  onChangeText: (value: string) => void;
}

const Input: FC<Props> = ({
  textValue,
  onChangeText,
  placeholder,
  isError,
  errorText,
  disabled,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEndEditing = useCallback(() => {
    setIsEditable(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditable(false);
  }, []);

  return (
    <View flex>
      <View style={styles.container}>
        <View row style={styles.spaceBetween} center>
          <View style={styles.inputContainer}>
            <View style={styles.searchIconContainer}>
              <Svgs.Edit width={24} height={24} fill={Colors.greySuva} />
            </View>
            <TextInput
              editable={!disabled}
              value={textValue}
              onChangeText={text => onChangeText(text)}
              style={
                placeholder
                  ? styles.textDisable
                  : isEditable
                  ? styles.textInput
                  : isError
                  ? styles.textError
                  : styles.textInputNotChange
              }
              selectionColor={Colors.orangeCarrot}
              onBlur={handleBlur}
              onFocus={handleEndEditing}
              placeholder={placeholder}
              placeholderTextColor={
                placeholder ? Colors.greySuva : Colors.greyNightRider
              }
            />
          </View>
        </View>
        {isError && errorText && !isEditable && (
          <Text style={styles.helpText} body_regular>
            {errorText}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    left: 12,
  },
  textInput: {
    backgroundColor: Colors.white,
    height: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    paddingLeft: 40,
    paddingRight: 14,
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  textError: {
    backgroundColor: Colors.white,
    height: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.redAlizarin,
    paddingLeft: 40,
    paddingRight: 14,
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  textInputNotChange: {
    backgroundColor: Colors.white,
    height: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingLeft: 40,
    paddingRight: 14,
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  textDisable: {
    backgroundColor: Colors.border,
    height: 44,
    borderRadius: 24,
    paddingLeft: 40,
    paddingRight: 14,
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  searchIconContainer: {
    position: 'absolute',
    zIndex: 10,
    left: 12,
    top: 10,
  },
  cancelContainer: {},
  cancelText: {
    textDecorationLine: 'underline',
  },
  helpText: {
    color: Colors.redAlizarin,
    marginTop: 4,
  },
  hoveredTextInput: {
    borderColor: 'red',
  },
});

export default memo<Props>(Input);
