import * as React from 'react';
import {TextStyle, TextProps as TextProperties, Platform} from 'react-native';
import {Text as ReactNativeText, View} from 'react-native-ui-lib';
import _ from 'lodash';
import {StyleSheet} from 'react-native';
import R from 'ramda';

interface TextProps extends TextProperties {
  h1?: boolean;
  h2?: boolean;
  h_page_title?: boolean;
  h_highlight?: boolean;
  body_bold?: boolean;
  body_regular?: boolean;
  caption_regular?: boolean;
  useLineBreak?: boolean;
  useFallback?: boolean;
  style?: TextStyle | TextStyle[];
  children?: any;
}
// TODO: Handle Text cover Text case (KR only)
function Text(props: TextProps) {
  const {
    h1,
    h2,
    h_page_title,
    h_highlight,
    body_bold,
    body_regular,
    caption_regular,
    useLineBreak,
    useFallback,
    children,
    style: styleOverride,
    ...rest
  } = props;
  const viewStyleArr = ['margin', 'flex', 'row'];

  const textStyleObj = R.pickBy(
    (val, key) => !viewStyleArr.some(t => t.includes(key?.substring(0, 2))),
    rest,
  );
  const initialTextViewStyle = R.pickBy(
    (val, key) => viewStyleArr.some(t => t.includes(key?.substring(0, 2))),
    rest,
  );
  const viewOverideStyle = R.pickBy(
    (val, key) => viewStyleArr.some(t => t.includes(key?.substring(0, 2))),
    styleOverride,
  );
  const textOverideStyle = R.pickBy(
    (val, key) => !viewStyleArr.some(t => t.includes(key?.substring(0, 2))),
    styleOverride,
  );
  const getTextMatrix = (text: any) => {
    return text.split('\n').map(function (row: any) {
      return row.split(' ');
    });
  };

  const styleWithTypeH1 = {
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0,
  };

  const styleWithTypeHPageTitle = {
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
  };

  const styleWithTypeHHighlight = {
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  };

  const styleWithTypeH2 = {
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: 0,
  };

  const styleWithTypeBold = {
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  };

  const styleWithTypeRegular = {
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  };

  const styleWithTypeCaption = {
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  };

  const typeStyleSpecial = [
    textOverideStyle,
    h1 && styleWithTypeH1,
    h2 && styleWithTypeH2,
    body_bold && styleWithTypeBold,
    body_regular && styleWithTypeRegular,
    caption_regular && styleWithTypeCaption,
  ];

  const typeStyleNormal = [
    styleOverride,
    h1 && styleWithTypeH1,
    h_page_title && styleWithTypeHPageTitle,
    h_highlight && styleWithTypeHHighlight,
    h2 && styleWithTypeH2,
    body_bold && styleWithTypeBold,
    body_regular && styleWithTypeRegular,
    caption_regular && styleWithTypeCaption,
  ];

  if (_.isString(children) && useLineBreak) {
    const viewStyle = R.mergeAll(
      R.flatten([styles.container, viewOverideStyle || {}]),
    );
    const textMatrix = getTextMatrix(children);
    return (
      <View style={viewStyle} {...initialTextViewStyle}>
        {textMatrix.map(function (rowText: any, rowIndex: any) {
          return (
            <View key={rowText + '-' + rowIndex} style={styles.rowWrapper}>
              {rowText.map(function (colText: any, colIndex: any) {
                return (
                  (colText !== '' ||
                    (rowText.length === 1 && colText === '')) && (
                    <ReactNativeText
                      key={colText + '-' + colIndex}
                      {...textStyleObj}
                      style={typeStyleSpecial}>
                      {colText + ' '}
                    </ReactNativeText>
                  )
                );
              })}
            </View>
          );
        })}
      </View>
    );
  } else if (!_.isString(children)) {
    return (
      <ReactNativeText {...rest} style={typeStyleNormal}>
        {children}
      </ReactNativeText>
    );
  }

  return (
    <ReactNativeText {...rest} style={typeStyleNormal}>
      {children}
    </ReactNativeText>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Text;
