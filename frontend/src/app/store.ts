
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
} from 'redux-persist';



const rootReducer = combineReducers({
});
export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;