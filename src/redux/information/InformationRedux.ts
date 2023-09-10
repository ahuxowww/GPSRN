import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './InformationActions';
import {storage} from '../_reduxPersist/persistConfig';

const stateKey = 'information';

export interface Information {
  speed: number;
  time: number;
  distance: number;
}

export interface InfomationState {
  information: Information;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: InfomationState = {
  information: {
    speed: 0,
    time: 0,
    distance: 0,
  },
};

/* ------------- Reducers ------------- */

const saveInfomation = (
  state: InfomationState,
  {payload: {speed, time, distance}}: ReturnType<typeof actions.saveInfomation>,
) => ({
  ...state,
  information: {
    speed,
    time,
    distance,
  },
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.saveInfomation)]: saveInfomation,
});

const persistConfig = {
  key: stateKey,
  storage,
};

const reducerMap = {
  [stateKey]: persistReducer(persistConfig, reducer),
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): InfomationState => state[stateKey];
const selectors = {
  getConnectInformation: ({information}: InfomationState) => information,
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
