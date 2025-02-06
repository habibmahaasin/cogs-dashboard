import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

import counterReducer from './slices/counterSlice';
import inventorySlice from './slices/inventorySlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter', 'inventory'],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  inventory: inventorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
