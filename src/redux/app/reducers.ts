import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './actions';
import {storage} from '../_reduxPersist/persistConfig';

const stateKey = 'user';

export interface AppState {
  isLoading: boolean;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: AppState = {
  isLoading: false,
};

/* ------------- Reducers ------------- */

const setIsLoading = (
  state: AppState,
  {payload: {isLoading}}: ReturnType<typeof actions.setIsLoading>,
) => ({
  ...state,
  isLoading,
});
/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.setIsLoading)]: setIsLoading,
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
  setIsLoading: ({isLoading}: AppState) => isLoading,
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
