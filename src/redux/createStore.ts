import {Reducer, Store, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import {storage} from './_reduxPersist/persistConfig';
import thunk from 'redux-thunk';

interface CreatedStore {
  store: Store;
  persistor: Persistor;
}

const persistConfig = {
  key: 'root',
  storage,
};

export default (rootReducer: Reducer): CreatedStore => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return {store, persistor};
};
