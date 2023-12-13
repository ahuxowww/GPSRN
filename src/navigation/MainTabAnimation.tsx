/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EventRegistration from '../screens/EventRegistration';
import MyPageScreen from '../screens/MyPage';
import HomeScreen from '../screens/HomeScreen';
import {Colors} from '../assets';
import AnimatedTabIcon from '../screens/component/AnimatedTabIcon';
import AnnouncementScreen from '../screens/Announcement';
import {useEffect} from 'react';
import {useVehicle} from '@src/hooks/vehicle';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainTabAnimation = () => {
  const {getActiveJourney} = useVehicle();
  const navigation = useNavigation();

  useEffect(() => {
    if (getActiveJourney) {
      navigation.navigate('CREATE_JOURNEY', {startTime: new Date()});
    }
  }, [getActiveJourney, navigation]);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.redAlizarin,
        tabBarInactiveTintColor: Colors.greyDrank,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          marginBottom: 5,
          elevation: 0,
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 11,
          lineHeight: 14,
          fontWeight: '400',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarButton: props => (
            <AnimatedTabIcon
              targetScreen={'HOME'}
              title={'Thiết bị'}
              active={props.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationStack"
        component={EventRegistration}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarButton: props => (
            <AnimatedTabIcon
              targetScreen={'NOTIFICATION'}
              title={'Hành trình'}
              active={props.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LocationStack"
        component={AnnouncementScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarButton: props => (
            <AnimatedTabIcon
              targetScreen={'EVENT_REGISTRATION'}
              title={'Bản đồ'}
              active={props.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MyPageScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarButton: props => (
            <AnimatedTabIcon
              targetScreen={'MY_PAGE'}
              title={'Tài khoản'}
              active={props.accessibilityState?.selected}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabAnimation;
