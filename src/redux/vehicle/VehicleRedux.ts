import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './VehicleActions';
import {storage} from '../_reduxPersist/persistConfig';

const stateKey = 'vehicle';

export interface VehicleState {
  vehicle: string;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: VehicleState = {
  vehicle: '',
};

/* ------------- Reducers ------------- */

const saveVehicle = (
  state: VehicleState,
  {payload: {vehicle}}: ReturnType<typeof actions.saveVehicle>,
) => ({
  ...state,
  vehicle: vehicle,
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.saveVehicle)]: saveVehicle,
});

const persistConfig = {
  key: stateKey,
  storage,
};

const reducerMap = {
  [stateKey]: persistReducer(persistConfig, reducer),
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): VehicleState => state[stateKey];
const selectors = {
  getVehicle: ({vehicle}: VehicleState) => vehicle,
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
