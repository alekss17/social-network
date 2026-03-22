import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ProfilePage from './ProfilePageReducer';
import UserPage from './UsersReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';

const profilePersistConfig = {
  key: 'profile',
  storage,
  whitelist: ['postData']
};

const ChatPersistConfig = {
  key: 'chat',
  storage
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userId', 'login', 'isAuth']
};

const rootReducer = combineReducers({
  ProfileReducer: persistReducer(profilePersistConfig, ProfilePage),
  UserPageReducer: UserPage,
  auth: persistReducer(authPersistConfig, authReducer),
  app: appReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>


export const persistor = persistStore(store);
export default store;
