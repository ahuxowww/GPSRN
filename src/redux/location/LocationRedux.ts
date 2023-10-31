import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './LocationActions';
import {storage} from '../_reduxPersist/persistConfig';
import {GeoLocation} from '@src/domain/map/type';

export const stateKey = 'location';

export interface LocationState {
  lat: number;
  lon: number;
  userCurrentLocation?: GeoLocation;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: LocationState = {
  lat: 0,
  lon: 0,
  userCurrentLocation: undefined,
};

/* ------------- Reducers ------------- */

const onSetLatitude = (
  state: LocationState,
  {payload: {lat}}: ReturnType<typeof actions.onSetLatitude>,
) => ({
  ...state,
  lat,
});

const onSetLongitude = (
  state: LocationState,
  {payload: {lon}}: ReturnType<typeof actions.onSetLongitude>,
) => ({
  ...state,
  lon,
});

const setCurrentUserLocation = (
  state: LocationState,
  {payload: {location}}: ReturnType<typeof actions.setCurrentUserLocation>,
): LocationState => ({
  ...state,
  userCurrentLocation: location,
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.onSetLatitude)]: onSetLatitude,
  [getType(actions.onSetLongitude)]: onSetLongitude,
  [getType(actions.setCurrentUserLocation)]: setCurrentUserLocation,
});

const persistConfig = {
  key: stateKey,
  storage,
};

const reducerMap = {
  [stateKey]: persistReducer(persistConfig, reducer),
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): LocationState => state[stateKey];
const selectors = {
  getLatitude: ({lat}: LocationState) => lat,
  getLongitude: ({lon}: LocationState) => lon,
  getCurrentUserLocation: ({userCurrentLocation}: LocationState) =>
    userCurrentLocation,
};

/* ------------- Export ------------- */
export default {
  selectors,
  // default export
  INITIAL_STATE,
  stateKey,
  getReducerState,
  reducerMap,
};
