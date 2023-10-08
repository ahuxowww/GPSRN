import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './LocationActions';
import {storage} from '../_reduxPersist/persistConfig';

export const stateKey = 'location';

export interface LocationState {
  lat: number;
  lon: number;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: LocationState = {
  lat: 0,
  lon: 0,
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

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.onSetLatitude)]: onSetLatitude,
  [getType(actions.onSetLongitude)]: onSetLongitude,
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
