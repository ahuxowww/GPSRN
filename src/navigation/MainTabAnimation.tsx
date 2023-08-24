/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EventRegistration from '../screens/EventRegistration';
import MyPageScreen from '../screens/MyPage';
import HomeScreen from '../screens/HomeScreen';
import {Colors} from '../assets';
import AnimatedTabIcon from '../screens/component/AnimatedTabIcon';
import AnnouncementScreen from '../screens/Announcement';

const Tab = createBottomTabNavigator();

const MainTabAnimation = () => {
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
        name="HOMESCREEN"
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
        name="EVENT_REGISTRATION"
        component={EventRegistration}
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
        name="NOTIFICATION"
        component={AnnouncementScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarButton: props => (
            <AnimatedTabIcon
              targetScreen={'NOTIFICATION'}
              title={'Cảnh báo'}
              active={props.accessibilityState?.selected}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MY_PAGE"
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

const styles = StyleSheet.create({
  logo: {
    width: 18,
    height: 18,
  },
});

export default MainTabAnimation;
