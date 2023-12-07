import React, {FC, useCallback} from 'react';
import {View, TouchableOpacity, Dialog} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

import {Colors} from '@src/assets';
import {ButtonText} from './ButtonText';
import {Image} from 'react-native';
import Text from './Text';

interface ModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  imageBackground?: any;
  children?: React.ReactNode;
  isDelete?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const DialogLib: FC<ModalProps> = ({
  visible,
  title,
  description,
  imageBackground,
  isDelete,
  onClose,
  onConfirm,
  children,
}) => {
  const renderButton = useCallback(() => {
    if (isDelete) {
      return (
        <View row spread marginB-16 marginH-24 marginT-8={description}>
          <ButtonText
            label={'Cancel'}
            styleText={styles.styleTextButton}
            onPress={onClose}
          />
          <ButtonText
            label={'Delete'}
            styleText={styles.buttonDeleteDialog}
            onPress={onConfirm}
          />
        </View>
      );
    } else {
      return (
        <View row right marginB-16 marginT-8={description} marginH-24>
          <ButtonText
            label={'OK'}
            styleText={styles.styleTextButton}
            onPress={onClose}
          />
        </View>
      );
    }
  }, [description, isDelete, onClose, onConfirm]);

  return (
    <Dialog
      useSafeArea
      visible={visible}
      height={'100%'}
      width={'100%'}
      containerStyle={styles.dialogContainer}
      onDismiss={onClose}>
      <TouchableOpacity flex marginH-32 center onPressOut={onClose}>
        <View bg-white spread style={styles.dialogBackground}>
          {imageBackground && (
            <Image source={imageBackground} style={styles.bgImage} />
          )}
          {title && (
            <>
              <View marginV-16 marginH-24>
                <Text h_page_title>{title}</Text>
              </View>
              <View height={2} bg-grey70 />
            </>
          )}
          {description && (
            <Text body_regular marginV-16 marginH-24>
              {description}
            </Text>
          )}
          {children ? children : renderButton()}
        </View>
      </TouchableOpacity>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  bgImage: {
    position: 'absolute',
  },
  dialogBackground: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: Colors.white,
    width: '100%',
  },
  textTitle: {
    fontSize: 18,
  },
  textDescription: {
    fontSize: 16,
  },
  buttonDeleteDialog: {
    color: Colors.redAlizarin,
    fontSize: 14,
  },
  styleTextButton: {
    fontSize: 14,
    color: Colors.blueNavy,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.greySuva,
  },
});
