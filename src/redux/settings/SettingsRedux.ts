import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './SettingsActions';
import {storage} from '../_reduxPersist/persistConfig';

export const stateKey = 'settings';

export interface SettingsState {
  rememberPW: boolean;
  currentPW: string;
  user: string;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: SettingsState = {
  rememberPW: false,
  currentPW: '',
  user: '',
};

/* ------------- Reducers ------------- */

const onSetRememberPW = (
  state: SettingsState,
  {payload: {rememberPW}}: ReturnType<typeof actions.onSetRememberPW>,
) => ({
  ...state,
  rememberPW,
});

const onSavecurrentPW = (
  state: SettingsState,
  {payload: {currentPW, user}}: ReturnType<typeof actions.onSavecurrentPW>,
) => ({
  ...state,
  currentPW,
  user,
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.onSetRememberPW)]: onSetRememberPW,
  [getType(actions.onSavecurrentPW)]: onSavecurrentPW,
});

const persistConfig = {
  key: stateKey,
  storage,
};

const reducerMap = {
  [stateKey]: persistReducer(persistConfig, reducer),
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): SettingsState => state[stateKey];
const selectors = {
  getRememberPW: ({rememberPW}: SettingsState) => rememberPW,
  getCurrentPW: ({currentPW}: SettingsState) => currentPW,
  getCurrentUser: ({user}: SettingsState) => user,
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
