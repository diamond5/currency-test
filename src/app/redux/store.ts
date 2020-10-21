import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist'

import currencyReducer from './currency';

const rootReducer = combineReducers({
    currency: currencyReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    // using redux-persist to persist store state
    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: false,
        }),
    });
    let persistor = persistStore(store)
    return {store, persistor}
}
