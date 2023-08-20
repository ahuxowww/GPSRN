import React, {ReactNode} from 'react';
import {ReducersMapObject, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import * as reducers from './reducers';
import {StateType} from 'typesafe-actions';
import createStore from './createStore';

/* ------------- Reducers ------------- */
const allReducers = Object.values(reducers).reduce(
  (prev: ReducersMapObject, curr: Record<string, any>): ReducersMapObject => {
    return {
      ...prev,
      ...curr.reducerMap,
    };
  },
  {},
);

const rootReducer = combineReducers(allReducers);

export type RootState = StateType<typeof rootReducer>;

/* ------------- Create Store ------------- */
const {store, persistor} = createStore(rootReducer);

interface Props {
  children: ReactNode;
}

/* ------------- Create Provider ------------- */

export const ReduxProvider = ({children}: Props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
