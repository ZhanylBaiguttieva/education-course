
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE, PERSIST,
  persistReducer,
  persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import {usersReducer} from '../features/users/usersSlice.ts';
import storage from 'redux-persist/lib/storage';

const usersPersistConfig = {
  key:'course:users',
  storage: storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;