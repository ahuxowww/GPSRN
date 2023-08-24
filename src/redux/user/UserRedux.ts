import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './UserActions';
import {storage} from '../_reduxPersist/persistConfig';

const stateKey = 'user';

export interface Alert {
  title?: string;
  content?: string;
  isVisible: boolean;
}

export interface AppState {
  user: any;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: AppState = {
  user: false,
};

/* ------------- Reducers ------------- */

const saveUser = (
  state: AppState,
  {payload: {user}}: ReturnType<typeof actions.saveUser>,
) => ({
  ...state,
  user: user,
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.saveUser)]: saveUser,
});

const persistConfig = {
  key: stateKey,
  storage,
};

const reducerMap = {
  [stateKey]: persistReducer(persistConfig, reducer),
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): AppState => state[stateKey];
const selectors = {
  getUserData: ({user}: AppState) => user,
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
