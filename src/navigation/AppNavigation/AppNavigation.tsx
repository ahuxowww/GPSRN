import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabAnimation from '../MainTabAnimation';
import SettingScreen from '../../screens/settings';

const AppNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
