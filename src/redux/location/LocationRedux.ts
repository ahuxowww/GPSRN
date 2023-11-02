import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './LocationActions';
import {storage} from '../_reduxPersist/persistConfig';
import {GeoLocation} from '@src/domain/map/type';

export const stateKey = 'location';

export interface LocationState {
  location: any;
  userCurrentLocation?: GeoLocation;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: LocationState = {
  location: undefined,
  userCurrentLocation: undefined,
};

/* ------------- Reducers ------------- */

const onSetLocation = (
  state: LocationState,
  {payload: {location}}: ReturnType<typeof actions.onSetLocation>,
) => ({
  ...state,
  location: location,
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
  [getType(actions.onSetLocation)]: onSetLocation,
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
  getLocation: ({location}: LocationState) => location,
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
