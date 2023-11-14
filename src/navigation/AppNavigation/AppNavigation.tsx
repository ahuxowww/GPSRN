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
import {useDispatch} from 'react-redux';
import {AppThunkDispatch} from '@src/redux/common';
import {onValue, ref} from 'firebase/database';
import {actions} from '@src/redux/location/LocationActions';
import {actions as userActions} from '@src/redux/user/UserActions';
import {db, firebase} from '@src/config/firebaseconfig';
import {
  requestUserPermission,
  NotificationListener,
} from '@src/services/PushNotification';
import {PermissionsAndroid} from 'react-native';

const AppNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  const {currentUser} = useUserLogin();
  const {getVehicle} = useVehicle();
  const isLogin = currentUser?.type === 'LOGIN';
  const dispatch = useDispatch<AppThunkDispatch>();

  React.useEffect(() => {
    const starCountRef = ref(db, 'GPS/');

    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      dispatch(actions.onSetLocation({location: data}));
    });
  }, [dispatch]);

  React.useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    NotificationListener();
  }, []);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('user')
      .get()
      .then(result => result.docs)
      .then(docs =>
        docs.map(doc => ({
          id: doc.id,
          username: doc.data().username,
          uri: doc.data().uri,
          method: doc.data().method,
        })),
      )
      .then(data => {
        dispatch(userActions.saveUserData({userData: data[0]}));
      });
  }, [dispatch]);

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
