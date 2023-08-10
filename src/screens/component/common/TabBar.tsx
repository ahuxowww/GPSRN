import * as React from 'react';
import {ScrollView} from 'react-native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import Text from './Text';
import {Colors, Metrics} from '../../../assets';

interface TabBarProps {
  tabList: any[];
  children?: React.ReactNode;
  indexSelected?: number;
  setIndexSelected?: (index: number) => void;
  usingWidthForItem?: boolean;
}

export function TabBar(props: TabBarProps) {
  // grab the props
  const {
    tabList,
    indexSelected,
    setIndexSelected,
    children,
    usingWidthForItem,
    ...rest
  } = props;

  const onChangeIndex = React.useCallback(
    (index: number) => {
      setIndexSelected && setIndexSelected(index);
    },
    [setIndexSelected],
  );

  if (children) {
    return (
      <View bg-white {...rest}>
        {children}
      </View>
    );
  } else {
    return (
      <View bg-white>
        <View row {...rest}>
          {tabList?.length > 3 ? (
            <ScrollView
              style={{
                width: Metrics.screen.width,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {tabList?.map(({label}, index: number) => (
                <View
                  marginL-16={index === 0 && tabList?.length > 3}
                  marginR-16={
                    index + 1 === tabList?.length && tabList?.length > 3
                  }
                  row
                  style={[
                    usingWidthForItem
                      ? {width: (Metrics.screen.width - 32) / 3.5}
                      : {paddingHorizontal: 12},
                  ]}
                  key={index}>
                  <TouchableOpacity
                    style={
                      indexSelected === index
                        ? {backgroundColor: Colors.blueMalibu}
                        : {backgroundColor: Colors.blueMalibu}
                    }
                    flex
                    center
                    onPress={() => onChangeIndex(index)}>
                    <Text>{label}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <>
              {tabList?.map(({label}, index: number) => (
                <View row flex key={index}>
                  <TouchableOpacity
                    flex
                    center
                    style={
                      indexSelected === index
                        ? {backgroundColor: Colors.blueMalibu, height: 32}
                        : {
                            backgroundColor: Colors.blueDarkTurquoise,
                            height: 32,
                          }
                    }
                    onPress={() => onChangeIndex(index)}>
                    <Text caption_regular color={Colors.white}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    );
  }
}
