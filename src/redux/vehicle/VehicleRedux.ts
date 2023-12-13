import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './VehicleActions';
import {storage} from '../_reduxPersist/persistConfig';

const stateKey = 'vehicle';

export interface VehicleState {
  vehicle: string;
  active: boolean;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: VehicleState = {
  vehicle: '',
  active: false
};

/* ------------- Reducers ------------- */

const saveVehicle = (
  state: VehicleState,
  {payload: {vehicle}}: ReturnType<typeof actions.saveVehicle>,
) => ({
  ...state,
  vehicle: vehicle,
});

const setStartJourney = (
  state: VehicleState,
  {payload: {active}}: ReturnType<typeof actions.setStartJourney>,
) => ({
  ...state,
  active: active,
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.saveVehicle)]: saveVehicle,
  [getType(actions.setStartJourney)]: setStartJourney,
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
  getActive: ({active}: VehicleState) => active,
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
