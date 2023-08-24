import React, {FC, memo, ReactNode} from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import {Modal, Platform, StyleSheet, Image} from 'react-native';

import {KeyboardAvoidingView} from './KeyboardAvoidingView';
import {Colors, Images, Metrics} from '../../../assets';
import {Header} from './Button';

interface Props {
  children: ReactNode;
  isVisible: boolean;
  onCloseModal: () => void;
  disabled?: boolean;
  customTitle?: string;
  undefinedBehavior?: boolean;
}

const BottomDialogView: FC<Props> = ({
  children,
  isVisible,
  onCloseModal,
  customTitle,
  undefinedBehavior,
}) => (
  <Modal
    statusBarTranslucent
    visible={isVisible}
    transparent
    animationType={'fade'}>
    <View flex backgroundColor={Colors.greyNightRider46}>
      <KeyboardAvoidingView undefinedBehavior={undefinedBehavior}>
        <TouchableOpacity activeOpacity={1} flex onPress={onCloseModal} />
        <View>
          <View style={styles.dialog}>
            <View bg-white>
              <Header
                customTitle={customTitle}
                customHeaderLeft={
                  <TouchableOpacity
                    center
                    style={styles.buttonClose}
                    onPress={onCloseModal}>
                    <Image
                      source={Images.logo.close}
                      style={{height: 24, width: 24}}
                    />
                  </TouchableOpacity>
                }
              />
              <View>{children}</View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  dialog: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.transparent,
    maxHeight: Metrics.screen.height - 100,
  },
  buttonClose: {
    height: 56,
    width: 52,
    display: 'flex',
    justifyContent: 'center',
  },
  bottomButton: {
    height: 70,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
    paddingBottom: Platform?.OS === 'ios' ? 26 : 18,
  },
});

export const BottomDialog = memo<Props>(BottomDialogView);
