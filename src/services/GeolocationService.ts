import {
  ActivityType,
  GeoLocation,
  LocationErrorType,
  LocationMotionChangeEvent,
} from '@src/domain/map/type';
import {TypedEvent} from '@src/ui/utilities/event';
import {Platform} from 'react-native';
import BackgroundGeolocation, {
  Config,
  CurrentPositionRequest,
  GeofenceEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
} from 'react-native-background-geolocation';
import {
  getApplicationName,
  getBuildNumber,
  getBundleId,
  getDeviceId,
  getSystemVersion,
} from 'react-native-device-info';

export type LocationActivityEvent = MotionActivityEvent & {
  type: ActivityType;
};

const DEFAULT_CONFIG: Config = {
  // Geolocation Config
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter: 20,
  // Activity Recognition
  stopTimeout: 8,
  // Allow the background-service to continue tracking when user closes the app.
  stopOnTerminate: false,
  heartbeatInterval: 60,
  // app already handled it by listening to providerchange event
  // and react native has a bug with not being able to present multiple alert / modal at the same time
  // ( freeze UI - a view layer on top not being removed )
  // https://github.com/facebook/react-native/issues/10471
  disableLocationAuthorizationAlert: true,
  // disableMotionActivityUpdates: true,
  // request location permission "Always" dialog text config
  // https://transistorsoft.medium.com/new-google-play-console-guidelines-for-sensitive-app-permissions-d9d2f4911353
  backgroundPermissionRationale: {
    title:
      'Allow app order to track your activity in the background, please enable backgroundPermissionOptionLabel location permission',
    positiveAction: 'Change to alow all time',
    negativeAction: 'Cancel',
  },
  startOnBoot: true,
  enableHeadless: true,
  reset: false,
};

export class GeolocationService {
  static onActivityChange = new TypedEvent<LocationActivityEvent>();
  static onLocation = new TypedEvent<GeoLocation>();
  static onHeartbeat = new TypedEvent<GeoLocation>();
  static currentLocation?: GeoLocation;
  static onLocationError = new TypedEvent<LocationErrorType>();
  static onMotionChange = new TypedEvent<LocationMotionChangeEvent>();
  static onProviderChange = new TypedEvent<ProviderChangeEvent>();
  static onGeofence = new TypedEvent<
    Omit<GeofenceEvent, 'location'> & {location: GeoLocation}
  >();

  private static providerState?: ProviderChangeEvent;
  private static isReady = false;
  static async init(option?: Config) {
    if (Platform.OS === 'android') {
      if (this.isReady) {
        return;
      }
    }

    BackgroundGeolocation.onLocation(
      e => {
        e.activity = this.correctActivityType(e.activity);
        this.currentLocation = e as unknown as GeoLocation;
        this.onLocation.emit(this.currentLocation);
        // emit remove location error
        this.onLocationError.emit(null);
      },
      e => {
        this.onLocationError.emit(e);
      },
    );

    BackgroundGeolocation.onHeartbeat(e => {
      if (e.location) {
        e.location.activity = this.correctActivityType(e.location.activity);
      }
      this.onHeartbeat.emit(e.location as unknown as GeoLocation);
    });

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(e => {
      if (e.location) {
        e.location.activity = this.correctActivityType(e.location.activity);
      }
      this.onMotionChange.emit(e);
    });

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(e => {
      this.onActivityChange.emit(this.correctActivityType(e));
    });

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange((e: ProviderChangeEvent) => {
      this.onProviderChange.emit(e);
      this.providerState = e;

      // handle ios 14 precise disable
      // https://transistorsoft.medium.com/ios-14-android-11-support-6ba6514e281c
      if (
        e.accuracyAuthorization ===
        BackgroundGeolocation.ACCURACY_AUTHORIZATION_REDUCED
      ) {
        BackgroundGeolocation.requestTemporaryFullAccuracy('Trips')
          .then(accuracyAuthorization => {
            if (
              accuracyAuthorization ===
              BackgroundGeolocation.ACCURACY_AUTHORIZATION_FULL
            ) {
              console.info(
                '[requestTemporaryFullAccuracy] GRANTED: ',
                accuracyAuthorization,
              );
            } else {
              console.info(
                '[requestTemporaryFullAccuracy] DENIED: ',
                accuracyAuthorization,
              );
            }
          })
          .catch(error => {
            console.error(
              '[requestTemporaryFullAccuracy] FAILED TO SHOW DIALOG: ',
              error,
            );
          });
      }

      if (!e.enabled) {
        this.onLocationError.emit(1);
      }
    });

    BackgroundGeolocation.onGeofence(event => {
      try {
        event.location.activity = this.correctActivityType(
          event.location.activity,
        );
        this.onGeofence.emit(event);
      } catch (e) {
        console.error('[Geofence error]', e);
      }
    });

    const providerState = await BackgroundGeolocation.getProviderState();
    this.providerState = providerState;

    try {
      // display permission message with updated language
      const backgroundPermissionRationale = {
        title: 'Travel detection?',
        message:
          'Set to enable applicationName to detect your journeys while in background or closed.',
        positiveAction: 'Switch to backgroundPermissionOptionLabel',
        negativeAction: 'Cancel',
      };

      await BackgroundGeolocation.ready(DEFAULT_CONFIG);

      // set background permission message
      await BackgroundGeolocation.setConfig({
        ...option,
        backgroundPermissionRationale,
      });
    } catch (error: any) {
      console.error(
        `[BackgroundGeolocation ready failed]: ${error.message ?? error}`,
      );
    }

    this.isReady = true;
  }

  static correctActivityType(
    activity: MotionActivityEvent,
  ): LocationActivityEvent {
    const activityType = (activity.activity ?? activity.type) as ActivityType;

    return {
      ...activity,
      activity: activityType,
      type: activityType,
    };
  }

  static async startTracking() {
    const state = await BackgroundGeolocation.getState();
    if (state.enabled) {
      return;
    }

    await BackgroundGeolocation.start();
    // await BackgroundGeolocation.changePace(true);
  }

  static async stopTracking() {
    await BackgroundGeolocation.stop();
    // await BackgroundGeolocation.changePace(false);
  }

  static async getCurrentPosition(
    options?: CurrentPositionRequest,
  ): Promise<GeoLocation | undefined> {
    try {
      const location = await BackgroundGeolocation.getCurrentPosition({
        desiredAccuracy: 80,
        timeout: 20,
        maximumAge: 18000, // Accept the last-recorded-location if no older than supplied value in milliseconds
        samples: 2,
        persist: false,
        ...options,
      });
      console.log({location});
      if (location) {
        this.currentLocation = location as unknown as GeoLocation;
        location.activity = this.correctActivityType(location.activity);
      }

      // emit remove location error
      this.onLocationError.emit(null);

      return this.currentLocation;
    } catch (e: any) {
      console.error('[Current Geo Location error]: ', e);
      this.onLocationError.emit(e);
      return;
    }
  }

  static async getGeolocationConfig(debugMode?: boolean): Promise<Config> {
    let config: Config = {
      // Logging & Debug Options
      // debug: __DEV__, // debug sounds / notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
      logMaxDays: 0,
      maxRecordsToPersist: 0,
    };

    if (debugMode) {
      const username = getSystemVersion() + '-' + getDeviceId();
      // const token =
      //   await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
      //     'locations',
      //     username,
      //     APP_CONFIG.geolocationServerUrl,
      //   );

      config = {
        // url: APP_CONFIG.geolocationServerUrl + 'api/locations',
        // transistorAuthorizationToken: token,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        logMaxDays: 5,
        maxRecordsToPersist: -1,
        batchSync: true,
        autoSyncThreshold: 5,
        maxBatchSize: 50,
        extras: {
          extra_device_id: getDeviceId(),
          system_version: getSystemVersion(),
          app_name: getApplicationName(),
          build_number: getBuildNumber(),
          bundle_id: getBundleId(),
        },
      };
    }

    return config;
  }
}
