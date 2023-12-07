import React, {FC, memo, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {Colors, Svgs} from '../../../assets';
import Text from '../../component/common/Text';
import {useNavigation} from '@react-navigation/native';
import {useVehicle} from '@src/hooks/vehicle';

interface TagProps {
  title?: string;
  type?: string;
  active?: boolean;
  onDelete?: (item: any) => void;
}

const Tag: FC<TagProps> = ({title, type, active, onDelete}) => {
  const navigation = useNavigation();
  const {onChangeVehicle} = useVehicle();

  const renderIcon = () => {
    switch (type) {
      case 'car':
        return <Svgs.CarBlack width={24} height={24} />;
      case 'bike':
        return <Svgs.Bike width={24} height={24} />;
      case 'motor':
        return <Svgs.Motor width={24} height={24} />;
      case 'walk':
        return <Svgs.Walk width={24} height={24} />;
      default:
        return <Svgs.Motor width={24} height={24} />;
    }
  };
  const onNavtoMapScreen = useCallback(() => {
    navigation.navigate('LocationStack');
    onChangeVehicle({vehicle: type ?? 'car'});
  }, [navigation, onChangeVehicle, type]);

  return (
    <View row flex centerV paddingV-8 paddingH-16 style={styles.container}>
      {renderIcon()}
      <View flex marginL-16>
        <Text body_regular color={Colors.greyNightRider}>
          {title}
        </Text>
        <Text body_regular color={Colors.greyNightRider57}>
          {active ? '🟢 Online' : 'Offline'}
        </Text>
      </View>
      <View row>
        {active && (
          <TouchableOpacity onPress={onNavtoMapScreen}>
            <Svgs.Right width={24} height={24} />
          </TouchableOpacity>
        )}
        <TouchableOpacity marginL-16 onPress={onDelete}>
          <Svgs.Delete width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greySilver,
  },
});

export const TagItem = memo<TagProps>(Tag);
