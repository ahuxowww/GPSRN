import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './MapActions';
import {storage} from '../_reduxPersist/persistConfig';

const stateKey = 'map';

export interface MapState {
  speed: number;
  distance: number;
  stateMap: number;
  date: Date;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: MapState = {
  speed: 0,
  distance: 0,
  stateMap: 0,
  date: new Date('2023-09-12T03:35:01.159Z'),
};

/* ------------- Reducers ------------- */

const saveSpeed = (
  state: MapState,
  {payload: {speed}}: ReturnType<typeof actions.saveSpeed>,
) => ({
  ...state,
  speed: speed,
});

const saveDistance = (
  state: MapState,
  {payload: {distance}}: ReturnType<typeof actions.saveDistance>,
) => ({
  ...state,
  distance: distance,
});

const saveStateMap = (
  state: MapState,
  {payload: {stateMap}}: ReturnType<typeof actions.saveStateMap>,
) => ({
  ...state,
  state: stateMap,
});

const saveDateMap = (
  state: MapState,
  {payload: {date}}: ReturnType<typeof actions.saveDateMap>,
) => ({
  ...state,
  date: date,
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.saveSpeed)]: saveSpeed,
  [getType(actions.saveDistance)]: saveDistance,
  [getType(actions.saveStateMap)]: saveStateMap,
  [getType(actions.saveDateMap)]: saveDateMap,
});

const persistConfig = {
  key: stateKey,
  storage,
};

const reducerMap = {
  [stateKey]: persistReducer(persistConfig, reducer),
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): MapState => state[stateKey];
const selectors = {
  getSpeed: ({speed}: MapState) => speed,
  getDistance: ({distance}: MapState) => distance,
  getStateMap: ({stateMap}: MapState) => stateMap,
  getDate: ({date}: MapState) => date,
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
