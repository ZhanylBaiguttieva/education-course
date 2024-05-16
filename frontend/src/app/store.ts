
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE, PERSIST,
  persistReducer,
  persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import {usersReducer} from '../features/users/usersSlice.ts';
import storage from 'redux-persist/lib/storage';
import {coursesReducer} from '../features/courses/containers/coursesSlice.ts';
import {categoriesReducer} from '../features/categories/containers/categoriesSlice.ts';
import {courseListenedReducer} from '../features/courseHistories/containers/courseHistorySlice.ts';

const usersPersistConfig = {
  key:'course:users',
  storage: storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  courses: coursesReducer,
  categories: categoriesReducer,
  courseListened: courseListenedReducer,
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