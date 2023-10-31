import {Location, LocationError, MotionChangeEvent} from 'react-native-background-geolocation';

export declare enum PointType {
  saveBattery = 'saveBattery',
  lossGPS = 'lossGPS',
  synthesized = 'synthesized',
}

export declare enum ActivityType {
  still = 'still',
  walking = 'walking',
  on_foot = 'on_foot',
  running = 'running',
  on_bicycle = 'on_bicycle',
  in_vehicle = 'in_vehicle',
  bus = 'bus',
  unknown = 'unknown',
  train = 'train',
  metro = 'metro',
  tram = 'tram',
  boat = 'boat',
  ski = 'ski',
  hiking = 'hiking',
  plane = 'plane',
}

export type LocationErrorType = LocationError | null;


export type GeoLocation = Omit<Location, 'activity'> & {
  type?: PointType;
  // type definition for react-native-background-geolocation-android activity is wrong, it's actually activity.type
  activity: {
    type: ActivityType;
    confidence: number;
  };
};

export type LocationMotionChangeEvent = MotionChangeEvent & {
  location: GeoLocation;
};