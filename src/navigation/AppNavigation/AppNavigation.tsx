import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabAnimation from '../MainTabAnimation';
import SettingScreen from '../../screens/settings';
import ChangeProfileScreen from '@src/screens/HomeScreen/ChangeProfile';
import Login from '@src/screens/Login';

const AppNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="LOGIN_SCREEN"
          component={Login}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="MAIN_TAB"
          component={MainTabAnimation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SETTING_SCREEN"
          component={SettingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CHANGE_PROFILE_SCREEN"
          component={ChangeProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
