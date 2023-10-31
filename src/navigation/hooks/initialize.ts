import {GeoLocation} from '@src/domain/map/type';
import {actions} from '@src/redux/location/LocationActions';
import {GeolocationService} from '@src/services/GeolocationService';
import React from 'react';
import {InteractionManager} from 'react-native';
import {useDispatch} from 'react-redux';

export const useWatchUserLocation = () => {
  const dispatch = useDispatch();

  const onLocationUpdate = React.useCallback(
    (loc: GeoLocation) => {
      InteractionManager.runAfterInteractions(() => {
        dispatch(actions.setCurrentUserLocation({location: loc}));
      });
    },
    [dispatch],
  );

  React.useEffect(() => {
    (async () => {
      await GeolocationService.startTracking();

      GeolocationService.onLocation.on(loc => {

        // https://transistorsoft.github.io/react-native-background-geolocation/classes/backgroundgeolocation.html#%E2%9A%A0%EF%B8%8F-note-locationsample
        if (loc.sample) {
          return;
        }

        onLocationUpdate(loc);
      });

      const currentLoc = await GeolocationService.getCurrentPosition();
      if (currentLoc) {
        onLocationUpdate(currentLoc);
      }
    })();

    return () => {
      GeolocationService.onLocation.off(onLocationUpdate);
    };
  }, [onLocationUpdate]);
};
