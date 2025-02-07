import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

import inventorySlice from './slices/inventorySlice';
import recipeSlice from './slices/recipeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter', 'inventory'],
  blacklist: ['recipe'],
};

const rootReducer = combineReducers({
  inventory: inventorySlice,
  recipe: recipeSlice,
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
