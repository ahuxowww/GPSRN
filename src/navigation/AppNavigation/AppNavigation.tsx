import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabAnimation from '../MainTabAnimation';
import ChangeProfileScreen from '@src/screens/HomeScreen/ChangeProfile';
import Login from '@src/screens/Login';
import {useUserLogin} from '@src/hooks/user';
import SelectVehicleScreen from '@src/screens/SelectVehicle';
import SettingScreen from '@src/screens/settings';
import {useVehicle} from '@src/hooks/vehicle';
import ChangeNameScreen from '@src/screens/ChangeNameProfile';

const AppNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  const {user} = useUserLogin();
  const {getVehicle} = useVehicle();
  const isLogin = user?.type === 'LOGIN';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogin ? (
          <Stack.Screen
            name="LOGIN_SCREEN"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <>
            {!getVehicle ? (
              <Stack.Screen
                name="SELECT_VEHICLE_SCREEN"
                component={SelectVehicleScreen}
                options={{headerShown: false}}
              />
            ) : null}
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
            <Stack.Screen
              name="CHANGE_NAME_PROFILE_SCREEN"
              component={ChangeNameScreen}
              options={{headerShown: false}}
            />
            {getVehicle ? (
              <Stack.Screen
                name="SELECT_VEHICLE_SCREEN"
                component={SelectVehicleScreen}
                options={{headerShown: false}}
              />
            ) : null}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
