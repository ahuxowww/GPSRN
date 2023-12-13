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
import {actions as journeyActions} from '@src/redux/vehicle/VehicleActions';
import {db, firebase} from '@src/config/firebaseconfig';
import {NotificationListener} from '@src/services/PushNotification';
import {PermissionsAndroid} from 'react-native';
import SignIn from '@src/screens/SignIn';
import EditProfile from '@src/screens/EditFrofile';
import CreateJourney from '@src/screens/CreateJourney';
import {DialogLib} from '@src/screens/component/common/DialogLib';

const firebaseConfig = {
  apiKey: 'AIzaSyDc_9V9JyBhoNmjQ8Uhl1sz-N3sWOFaHwU',
  authDomain: 'test-gps-e2521.firebaseapp.com',
  databaseURL:
    'https://test-gps-e2521-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'test-gps-e2521',
  storageBucket: 'test-gps-e2521.appspot.com',
  messagingSenderId: '204042669842',
  appId: '1:204042669842:web:8b304502976c178f7dadcb',
};

const AppNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  const {currentUser} = useUserLogin();
  const isLogin = currentUser?.type === 'LOGIN';
  const {getActiveJourney, getVehicle} = useVehicle();
  const [activeDangerous, setActiveDangerous] = React.useState(false);
  const [speed, setSpeed] = React.useState(0);

  const dispatch = useDispatch<AppThunkDispatch>();

  const closeDangerous = React.useCallback(() => {
    setActiveDangerous(false);
  }, []);
  React.useEffect(() => {
    const starCountRef = ref(db, 'GPS/');

    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      dispatch(actions.onSetLocation({location: data}));
      setSpeed(data?.f_speed);
      if (getActiveJourney && data?.f_speed > 20) {
        dispatch(journeyActions.setStartJourney({active: true}));
      }
    });
  }, [dispatch, getActiveJourney]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (
        (getVehicle === 'motor' && speed > 40) ||
        (getVehicle === 'car' && speed > 60)
      ) {
        setActiveDangerous(true);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [getVehicle, speed]);

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
          phone: doc.data().phone,
        })),
      )
      .then(data => {
        dispatch(userActions.saveUserData({userData: data[0]}));
      });
  }, [dispatch, getActiveJourney]);

  React.useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    NotificationListener();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogin ? (
          <>
            <Stack.Screen
              name="LOGIN_SCREEN"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SIGN_IN"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EDIT_FROFILE"
              component={EditProfile}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
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
            <Stack.Screen
              name="EDIT_FROFILE"
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SELECT_VEHICLE_SCREEN"
              component={SelectVehicleScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CREATE_JOURNEY"
              component={CreateJourney}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
      <DialogLib
        visible={activeDangerous}
        title={'Cảnh báo'}
        description={'Bạn đang vượt quá vận tốc quy định'}
        onClose={closeDangerous}
      />
    </NavigationContainer>
  );
};

export default AppNavigation;
