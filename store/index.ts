import {configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bookmarksReduser from './slices/bookmarksSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedBookmarksReducer = persistReducer(persistConfig, bookmarksReduser);

export const store = configureStore({
        reducer: {
            bookmarks: persistedBookmarksReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE],
                }
            })
    }
)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;